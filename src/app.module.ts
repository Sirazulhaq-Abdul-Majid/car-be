import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from './base/base.module';
import { Users } from './users/database/users.entity';
import { Auth } from './auth/database/auth.entity';
import { Cars } from './cars/database/cars.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CarsModule } from './cars/cars.module';
import { MulterModule } from '@nestjs/platform-express';
import { Images } from './cars/database/images.entity';
import { ChatsModule } from './chats/chats.module';
import { Chats } from './chats/database/chat.entity';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { VerifyEmail } from './auth/database/verify-email.entity';
import { ForgetPassword } from './auth/database/forget-password.entity';
import { SendgridAppModule } from './sendgrid/sendgrid.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    }),
    MulterModule.register({ limits: { fileSize: 1024 * 1024 } }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.office365.com',
        auth: {

          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      }
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_DRIVER as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Users, Auth, Cars, Images, Chats, VerifyEmail, ForgetPassword
      ],
      synchronize: true,
    }),
    BaseModule, UsersModule, AuthModule, CarsModule, ChatsModule, NodemailerModule, SendgridAppModule],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule { }
