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
      id: breed.id,
      name: breed.name,
    };
  }

  async findAll() {
    const breeds = await this.breedRepository.find({
      select: ['id', 'name'],
    });

    return breeds;
  }

  async findOne(id: string) {
    const breed = await this.breedRepository.findOne({
      where: { id },
      select: ['id', 'name'],
    });

    return breed;
  }

  async update(id: string, updateBreedDto: UpdateBreedDto) {
    const { affected } = await this.breedRepository.update(id, updateBreedDto);

    if (!affected) {
      throw NotFoundException;
    }

    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.breedRepository.softDelete(id);

    return {
      message: "Breed deleted successfully"
    };
  }
}
