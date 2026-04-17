import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login/index')
  async loginPost(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('login/index')
  async loginGet(@Query() query: { username: string; password: string }) {
    const loginDto: LoginDto = {
      username: query.username,
      password: query.password,
    };
    return this.authService.login(loginDto);
  }

  @Post('reg')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
