import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Auth } from './database/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { ForgetPasswordDTO } from './dto/forget-password.dto';
import { ForgetPassword } from './database/forget-password.entity';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { SendgridService } from 'src/sendgrid/sendgrid.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService, @InjectRepository(Auth) private authRepo: Repository<Auth>, @InjectRepository(ForgetPassword) private forgetPasswordRepo: Repository<ForgetPassword>, private mailService: SendgridService) { }

  async signIn(username: string, password: string) {
    const user: any = await this.userService.findOne(username)
    const correct = await bcrypt.compare(password, user?.password_hash)
    if (!correct) {
      throw new UnauthorizedException("Wrong username or password")
    }
    const payload = { sub: user.id, username: user.login_id, fullname: user.full_name, role: user.role }
    const { accessToken, refreshToken } = await this.signJWT(payload)
    try {
      const userRT = this.authRepo.create({
        refresh_token: refreshToken,
        users: user
      })
      await this.authRepo.save(userRT)
    } catch (error) {
      console.log(error)
    }
    return {
      accessToken,
      refreshToken,
      statusCode: 200
    }
  }

  async logout(payload: any) {
    const refreshTokens = await this.authRepo.find({ where: { users: { login_id: payload.username } } })
    try {
      refreshTokens.forEach(async rt => {
        this.authRepo.delete(rt.id)
      })
      return {
        statusCode: 200
      }
    } catch (error) {
      console.log(error)
    }
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username)
    if (!user) {
      return null
    }
    const correct = await bcrypt.compare(password, user.password_hash)
    if (!correct) {
      return null
    }
    const { password_hash, ...rest } = user
    return rest
  }

  async refresh(payload: any, rt: string) {
    const check = await this.authRepo.findOneBy({ refresh_token: rt })
    if (!check) {
      throw new UnauthorizedException('error')
    }
    try {
      await this.authRepo.delete(check.id)
    } catch (error) {
      console.log(error)
    }
    const { accessToken, refreshToken } = await this.signJWT(payload)
    const user = await this.userService.findOne(payload.username)
    if (!user) {
      throw new UnauthorizedException('error')
    }
    try {
      const userRT = this.authRepo.create({
        refresh_token: refreshToken,
        users: user
      })
      await this.authRepo.save(userRT)
    } catch (error) {
      console.log(error)
    }
    return { accessToken, refreshToken, statusCode: 200 }
  }

  async validateAccessToken(token: string) {
    try {
      const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      if (!decode) {
        return false
      }
      const user = await this.userService.findOneById(Number(decode.sub))
      if (!user) {
        return false
      }
      delete user.password_hash
      return user
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException('token invalid')
    }
  }

  async forgetPassword(forgetPassword: ForgetPasswordDTO) {
    try {
      const token = await this.generateRandomInt()
      const user = await this.userService.findOneByEmail(forgetPassword.email)
      if (!user) {
        throw new BadRequestException('Email not found')
      }
      const forget = this.forgetPasswordRepo.create({
        user: user,
        token: token
      })
      try {
        await this.forgetPasswordRepo.save(forget)
      } catch (err) {
        console.log(err)
      }
      await this.mailService.sendForgetPasswordMail(token, user.email)
      return {
        statusCode: 200
      }
    } catch (err) {
      console.log(err)
    }
  }

  async resetPassword(resetPassword: ResetPasswordDTO) {
    try {
      const tokenExist = await this.forgetPasswordRepo.findOne({ where: { token: resetPassword.token }, relations: ['user'] })
      const user = await this.userService.findOneByEmail(tokenExist.user.email)
      const currentTimeStamp: any = Date.now();
      const tokenTimeStamp: any = tokenExist.createdDate;
      const diffInMinutes = Math.floor(
        Math.abs(currentTimeStamp - tokenTimeStamp) / (1000 * 60)
      );
      if (!user || user.id !== tokenExist.user.id) {
        throw new BadRequestException('')
      }
      if (diffInMinutes > 5) {
        throw new BadRequestException('token timed out')
      }
      const hashedPassword = await this.hashPassword(resetPassword.password)
      user['password_hash'] = hashedPassword
      const updatedUser = await this.userService.update(user)
      await this.forgetPasswordRepo.delete(tokenExist.id)
      if (!updatedUser) {
        throw new BadRequestException()
      }
      return {
        statusCode: 200
      }
    } catch (error) {
      console.log(error)
    }
  }

  //worker functions
  async signJWT(payload: any) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.ATEXP
    })
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.RTEXP
    })
    return { accessToken, refreshToken }
  }

  async generateRandomInt() {
    return Number(Math.floor(Math.random() * 900000) + 100000);
  }

  async checkOTP(token: number) {
    const tokenExist = await this.forgetPasswordRepo.findOne({ where: { token } })
    if (!tokenExist) {
      throw new BadRequestException('token invalid')
    }
    return {
      statusCode: 200,
      message: 'token valid'
    }
  }

  async hashPassword(password: any) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
