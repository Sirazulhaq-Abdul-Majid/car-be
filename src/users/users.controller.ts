import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ModifyUserDto, SignupDTO, VerifyDto } from './dto';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post('signup')
  async signup(@Body() signupDto: SignupDTO) {
    return this.userService.signUp(signupDto)
  }

  @Post('verify/:OTP')
  async verify(@Body() verifyDto: VerifyDto, @Param('OTP') otp: number) {
    return this.userService.verifyEmail(verifyDto.email, otp)
  }

  @UseGuards(AccessTokenGuard)
  @Post('modify')
  async updateUser(@Body() modifyUserDto: ModifyUserDto, @Request() req: any) {
    return this.userService.modifyUser(req.user, modifyUserDto)
  }

  @Get('test')
  test() {
    return this.userService.generateRandomInt()
  }
}
