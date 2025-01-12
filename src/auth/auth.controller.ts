import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Req
} from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterUserDto from './dto/register.dto';
import LoginUserDto from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

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
  @HttpCode(HttpStatus.OK)
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Req() request: Request & { user: {
    name: string;
    email: string;
    iat: number;
    exp: number;
  }}) {
    return {
      name: request.user.name,
      email: request.user.email,
      /*
        The iat (issued at) and exp (expiration),
        fields in a JWT are typically represented in Unix time,
        which is the number of seconds since January 1, 1970 (the Unix epoch).
        JavaScript's Date object, however, expects the time in milliseconds
        since the Unix epoch. Therefore, you need to multiply the Unix time by 1000
        to convert it from seconds to milliseconds."
      */
      expeditedAt: new Date(request.user.iat * 1000).toISOString(),
      expiresAt: new Date(request.user.exp * 1000).toISOString(),
    };
  }
}
