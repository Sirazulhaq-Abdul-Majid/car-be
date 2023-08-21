import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDTO } from './dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post('signup')
  async signup(@Body() signupDto: SignupDTO) {
    return this.userService.signUp(signupDto)
  }
}
