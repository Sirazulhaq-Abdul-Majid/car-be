import { Controller, Get } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Controller('nodemailer')
export class NodemailerController {
  constructor(private readonly nodemailerService: NodemailerService) { }
  @Get()
  sendMail() {
    // return this.nodemailerService.sendMail()
  }
}
