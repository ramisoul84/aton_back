import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const access_token = request.headers.authorization?.split(' ')[1];
    if (!access_token) {
      throw new UnauthorizedException();
    }
    try {
      const secret = this.configService.get('JWT_KEY');
      await this.jwt.verifyAsync(access_token, {
        secret: secret,
      });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
