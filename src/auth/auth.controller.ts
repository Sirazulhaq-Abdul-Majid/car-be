import { Body, Controller, Get, Request, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guard/local.guard';
import { AuthService } from './auth.service';
import { LoginDto, RefreshDTO } from './dto';
import { AccessTokenGuard } from './guard/access-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalGuard)
  @Get('login')
  async login(@Body() login: LoginDto) {
    return this.authService.signIn(login.username, login.password)
  }

  @UseGuards(AccessTokenGuard)
  @Get('refresh')
  async refresh(@Request() req: any, @Body() rt: RefreshDTO) {
    return await this.authService.refresh(req.user, rt.refreshToken)
  }

  @UseGuards(AccessTokenGuard)
  @Get('protected')
  hi() {
    return 'hi'
  }
}
