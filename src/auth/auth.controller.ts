import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req
} from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterUserDto from './dto/register.dto';
import LoginUserDto from './dto/login.dto';
import { type RequestWithUser } from './interfaces/request.interface';
import Role from './enums/role.enum';
import Auth from './decorators/auth.decorator';

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
  @Auth(Role.ADMIN)
  profile(@Req() request: RequestWithUser) {
    return this.authService.profile(request.user);
  }
}
