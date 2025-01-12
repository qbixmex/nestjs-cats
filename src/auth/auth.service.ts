import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import RegisterUserDto from './dto/register.dto';
import LoginUserDto from './dto/login.dto';
import { type UserPayload } from './interfaces/request.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ email, password }: RegisterUserDto) {
    const userExists = await this.userService.findOneByEmail(email);

    if (userExists) {
      throw new BadRequestException(
        `User with email: <${email}>, already exists !`
      );
    }

    return await this.userService.create({ email, password });
  }

  async login({ email, password }: LoginUserDto) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Bad credentials, email or password is wrong !');
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Bad credentials, email or password is wrong !');
    }

    const payload = {
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'User logged in successfully !',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  async profile({ email }: UserPayload) {
    const user = await this.userService.findOneByEmail(email);
    return user;
  }
}
