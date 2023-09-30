import { Module } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';
import { SendgridController } from './sendgrid.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail'

@Module({
  controllers: [SendgridController],
  providers: [SendgridService],
})
export class SendgridAppModule { }
