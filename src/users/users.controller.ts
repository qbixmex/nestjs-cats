import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import Role from '../common/enums/role.enum';
import Auth from '../auth/decorators/auth.decorator';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth(Role.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth(Role.USER)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth(Role.USER)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get(':email')
  @Auth(Role.USER)
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Get(':email')
  findOneByEmailWithPassword(@Param('email') email: string) {
    return this.usersService.findOneByEmailWithPassword(email);
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
