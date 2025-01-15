import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterUserDto from './dto/register.dto';
import LoginUserDto from './dto/login.dto';
import Role from '../common/enums/role.enum';
import Auth from './decorators/auth.decorator';
import ActiveUser from '../common/decorators/active-user.decorator';
import type ActiveUserInterface from '../common/interfaces/user-active.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
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

  @ApiBearerAuth()
  @Get('profile')
  @Auth(Role.USER)
  profile(@ActiveUser() user: ActiveUserInterface) {
    return this.authService.profile(user);
  }
}
