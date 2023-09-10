import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class WebSocketGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      return false
    }
    const payload = await this.authService.validateAccessToken(token)
    if (!payload) {
      return false
    }
    request['user'] = payload
    return true
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.handshake.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
