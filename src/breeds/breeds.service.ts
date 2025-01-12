import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createBreedDto: CreateBreedDto) {
    const breed = await this.breedRepository.save(createBreedDto);

    return {
      message: "Breed created successfully",
      breed: {
        id: breed.id,
        name: breed.name,
        createdAt: breed.createdAt,
        updatedAt: breed.updatedAt,
      }
    };
  }

  async findAll() {
    const breeds = await this.breedRepository.find({
      select: ['id', 'name', 'createdAt', 'updatedAt'],
    });

    return breeds;
  }

  async findOne(id: string) {
    const breed = await this.breedRepository.findOne({
      where: { id },
      select: ['id', 'name', 'createdAt', 'updatedAt'],
    });

    return breed;
  }

  async update(id: string, updateBreedDto: UpdateBreedDto) {
    const { affected } = await this.breedRepository.update(id, {
      ...updateBreedDto,
      updatedAt: new Date(),
    });

    if (!affected) {
      throw NotFoundException;
    }

    const updatedBreed = await this.findOne(id);

    return {
      message: "Breed updated successfully",
      breed: updatedBreed,
    };
  }

  async remove(id: string) {
    await this.breedRepository.softDelete(id);

    return {
      message: "Breed deleted successfully"
    };
  }
}
