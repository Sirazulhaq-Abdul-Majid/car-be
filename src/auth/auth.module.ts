import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtATStrategy } from './strategy/at.strategy';
import { JwtRTStrategy } from './strategy/rt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './database/auth.entity';
import { ForgetPassword } from './database/forget-password.entity';
import { SendgridAppModule } from 'src/sendgrid/sendgrid.module';

@Module({
  imports: [UsersModule, PassportModule, SendgridAppModule, JwtModule.register({}), TypeOrmModule.forFeature([Auth, ForgetPassword])],
  providers: [AuthService, LocalStrategy, JwtATStrategy, JwtRTStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
