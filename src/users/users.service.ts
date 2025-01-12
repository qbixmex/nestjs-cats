import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save(createUserDto);

    // Remove password from the response
    delete user.password;

    return {
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    };
  }

  async findAll() {
    const users = await this.userRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!user) {
      throw new BadRequestException(`User not found: ${id}`);
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!user) {
      throw new BadRequestException(`User not found with email: ${email}`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userFound = await this.findOne(id);

    if (!userFound) {
      throw new BadRequestException(`User does not exist with id: ${id}`);
    }

    await this.userRepository.update(id, {
      ...userFound,
      ...updateUserDto,
      updatedAt: new Date(),
    });

    const updatedUser = await this.findOne(id);

    return {
      message: 'User updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    };
  }

  async remove(id: string) {
    const userFound = await this.findOne(id);

    if (!userFound) {
      throw new BadRequestException(`User does not exist with id: ${id}`);
    }

    await this.userRepository.softDelete(id);

    return {
      message: 'User deleted successfully',
    };
  }
}
