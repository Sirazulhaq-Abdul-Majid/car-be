import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './database/users.entity';
import { UsersController } from './users.controller';
import { VerifyEmail } from 'src/auth/database/verify-email.entity';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users, VerifyEmail]), NodemailerModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [TypeOrmModule, UsersService]
})
export class UsersModule { }
