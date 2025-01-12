import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import RegisterUserDto from './dto/register.dto';
import LoginUserDto from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userRepository: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ email, password }: RegisterUserDto) {
    const userExists = await this.userRepository.findOneByEmail(email);

    if (userExists) {
      throw new BadRequestException(
        `User with email: <${email}>, already exists !`
      );
    }

    return await this.userRepository.create({ email, password });
  }

  async login({ email, password }: LoginUserDto) {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Bad credentials, email or password is wrong !');
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Bad credentials, email or password is wrong !');
    }

    const payload = {
      name: user.name,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'User logged in successfully !',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
