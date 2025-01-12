import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterUserDto from './dto/register.dto';
import LoginUserDto from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}  

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }
}
