import { Controller, Get } from "@nestjs/common";
// TODO: hi
@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return "hi!";
  }
}
