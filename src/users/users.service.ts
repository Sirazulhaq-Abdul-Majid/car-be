import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './database/users.entity';
import { Repository } from 'typeorm';
import { SignupDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private userRepo: Repository<Users>) { }

  async signUp(signupDto: SignupDTO) {
    const user = this.userRepo.create({
      full_name: signupDto.full_name,
      email: signupDto.email,
      login_id: signupDto.login_id,
      password_hash: signupDto.password,
      state: signupDto.state,
      city: signupDto.city
    })
    try {
      const savedUser = await this.userRepo.save(user)
      const { full_name, email, login_id, ...rest } = savedUser
      return { full_name, email, login_id }
    } catch (error) {
      throw new BadRequestException("Username or email is taken")
    }
  }

  //worker function
  async findOne(username: string) {
    try {
      if (!username) {
        return null
      }
      const user = await this.userRepo.findOne({ where: { login_id: username } })
      if (user) {
        return user
      } else {
        return null
      }
    } catch (error) {
      console.log(error)
      throw new BadRequestException()
    }
  }

  async findOneById(id: number) {
    try {
      const user = await this.userRepo.findOneBy({ id })
      if (user) {
        return user
      } else {
        return null
      }
    } catch (error) {
      console.log(error)
      throw new BadRequestException()
    }
  }

  async save(user: Users) {
    try {
      await this.userRepo.save(user)
    } catch (error) {
      console.log(error)
      throw new BadRequestException()
    }
  }

  async findOneReview(id: number) {
    try {
      const user = await this.userRepo.findOne({ where: { id }, relations: ['review'] })
      if (!user) {
        throw new NotFoundException()
      }
      return user
    } catch (error) {
      console.log(error)
    }
  }
}
