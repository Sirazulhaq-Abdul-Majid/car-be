import { Controller, Get } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';

@Controller('sendgrid')
export class SendgridController {
  constructor(private readonly sendgridService: SendgridService) { }

}
