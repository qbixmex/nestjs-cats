import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import Role from '../common/enums/role.enum';
import Auth from '../auth/decorators/auth.decorator';
import ActiveUser from '../common/decorators/active-user.decorator';
import type ActiveUserInterface from '../common/interfaces/user-active.interface';

@ApiTags('cats')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Your not authorized to access to this resource !' })
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'The cat has been successfully created !' })
  @ApiForbiddenResponse({ description: 'Your cannot create this resource !' })
  @Auth(Role.ADMIN)
  create(
    @Body() createCatDto: CreateCatDto,
    @ActiveUser() user: ActiveUserInterface
  ) {
    return this.catsService.create(createCatDto, user.email);
  }

  @Get()
  @Auth(Role.USER)
  findAll(@ActiveUser() user: ActiveUserInterface) {
    return this.catsService.findAll(user);
  }

  @Get(':id')
  @Auth(Role.USER)
  findOne(
    @Param('id') id: string,
    @ActiveUser() user: ActiveUserInterface
  ) {
    return this.catsService.findOne(id, user);
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
    @ActiveUser() user: ActiveUserInterface
  ) {
    return this.catsService.update(id, updateCatDto, user);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(
    @Param('id') id: string,
    @ActiveUser() user: ActiveUserInterface
  ) {
    return this.catsService.remove(id, user);
  }
}
