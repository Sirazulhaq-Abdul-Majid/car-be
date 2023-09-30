import { Controller, Get } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';

@Controller('sendgrid')
export class SendgridController {
  constructor(private readonly sendgridService: SendgridService) { }

  @Get('hi')
  async hi() {
    const mail = {
      to: "sirazulhaq0205@gmail.com",
      subject: "pp",
      from: "junkcars.help@outlook.com",
      text: "i cri",
      html: "<marquee>i cri</marquee>"
    }
    return await this.sendgridService.send(mail)
  }
}
