import { Injectable } from '@nestjs/common';
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
      password_hash: signupDto.password
    })
    try {
      const savedUser = await this.userRepo.save(user)
      const { full_name, email, login_id, ...rest } = savedUser
      return { full_name, email, login_id }
    } catch (error) {
      return "Username or email is taken"
    }
  }

  //worker function
  async findOne(username: string) {
    const user = await this.userRepo.findOneBy({ login_id: username })
    if (user) {
      return user
    } else {
      return null
    }
  }
}
