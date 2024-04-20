import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @Post('register')
  register(@Body() user: RegisterUserDto) {
    return this.authService.register(user);
  }
}
