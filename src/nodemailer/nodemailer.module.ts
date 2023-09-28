import { Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';
import { NodemailerController } from './nodemailer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifyEmail } from 'src/auth/database/verify-email.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VerifyEmail])],
  controllers: [NodemailerController],
  providers: [NodemailerService],
  exports: [NodemailerService]
})
export class NodemailerModule { }
