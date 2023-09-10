import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Auth } from './database/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService, @InjectRepository(Auth) private authRepo: Repository<Auth>) { }

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
      const decode = jwt.verify(token, "wk1JDuH4OsKWLHVXam9vfvUC5bZf974zEeHXmxSOGYAOU2AJCQVIj8B0ZeoGMPi8ylAc5jpKb85HdOzQ5rM6gdqdUl4ZGWXUPl3SvuLoLn4WU0iV3J3")
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
}
