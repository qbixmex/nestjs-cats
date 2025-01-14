import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import type ActiveUserInterface from '../common/interfaces/user-active.interface';
import Role from '../common/enums/role.enum';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(
    createCatDto: CreateCatDto,
    userEmail: string
  ) {
    const breed = await this.validateBreed(createCatDto.breed);

    const cat = await this.catRepository.save({
      name: createCatDto.name,
      age: createCatDto.age,
      breed,
      userEmail
    });

    return {
      id: cat.id,
      name: cat.name,
      age: cat.age,
      breed: cat.breed.name,
      userEmail: cat.userEmail,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
    };
  }

  async findAll(user: ActiveUserInterface) {
    const cats = await this.catRepository.find({
      where: {
        userEmail: (user.role === Role.ADMIN) ? null : user.email
      },
      select: {
        id: true,
        name: true,
        age: true,
        breed: { name: true },
        userEmail: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const output = cats.map((cat) => ({
      id: cat.id,
      name: cat.name,
      age: cat.age,
      breed: cat.breed ? cat.breed.name: 'Not Provided',
      userEmail: cat.userEmail,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
    }));

    return output;
  }

  async findOne(id: string, user: ActiveUserInterface) {
    const cat = await this.catRepository.findOne({ where: { id } });

    if (!cat) {
      throw new BadRequestException(`Cat not found: ${id}`);
    }

    this.validateOwnership(user, cat.userEmail);

    return {
      id: cat.id,
      name: cat.name,
      age: cat.age,
      breed: cat.breed ? cat.breed.name: 'Not Provided',
      userEmail: cat.userEmail,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
    };
  }

  async update(
    id: string,
    updateCatDto: UpdateCatDto,
    user: ActiveUserInterface
  ) {
    const cat = await this.findOne(id, user);

    const breedToUpdate = updateCatDto.breed
      ? await this.validateBreed(updateCatDto.breed)
      : undefined;

    const updatedCat = await this.catRepository.save({
      ...cat,
      ...updateCatDto,
      breed: breedToUpdate,
    });

    if (!updatedCat) {
      throw new BadRequestException(`Cannot update the cat: ${cat.name}`);
    }

    return {
      message: "Cat updated successfully",
      cat: {
        ...updatedCat,
        breed: updatedCat.breed
          ? updatedCat.breed.name
          : cat.breed,
      },
    };
  }

  async remove(id: string, user: ActiveUserInterface) {
    const cat = await this.findOne(id, user);

    this.validateOwnership(user, cat.userEmail);
    
    await this.catRepository.softDelete({
      id,
      userEmail: (user.role === Role.ADMIN) ? undefined : user.email,
    });

    return {
      message: "Cat deleted successfully"
    };
  }

  /**
   * Validate if the user is the owner of the cat.
   * 
   * @param user User instance
   * @param cat Cat instance
   * @example ```typescript
   * this.validateOwnership(user, cat);
   * ```
   * @throws UnauthorizedException
   */
  private validateOwnership(user: ActiveUserInterface, catUserEmail: string) {
    if (user.role !== Role.ADMIN && user.email !== catUserEmail) {
      throw new UnauthorizedException("You do not have permissions to get this resource");
    }
  }

  private async validateBreed(breed: string) {
    const BreedInstance = await this.breedRepository.findOneBy({ name: breed });

    if (!BreedInstance) {
      throw new NotFoundException(`Breed not found: ${breed}`);
    }

    return BreedInstance;
  };
}
