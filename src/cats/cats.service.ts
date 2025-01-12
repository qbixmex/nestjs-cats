import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    const breed = await this.breedRepository.findOneBy({
      name: createCatDto.breed
    });

    if (!breed) {
      throw new NotFoundException(`Breed not found: ${createCatDto.breed}`);
    }

    const cat = await this.catRepository.save({
      name: createCatDto.name,
      age: createCatDto.age,
      breed,
    });

    return {
      id: cat.id,
      name: cat.name,
      age: cat.age,
      breed: cat.breed.name,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
    };
  }

  async findAll() {
    const cats = await this.catRepository.find({
      select: {
        id: true,
        name: true,
        age: true,
        breed: { name: true },
        createdAt: true,
        updatedAt: true,
      },
    });

    const output = cats.map((cat) => ({
      id: cat.id,
      name: cat.name,
      age: cat.age,
      breed: cat.breed ? cat.breed.name: 'Not Provided',
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
    }));

    return output;
  }

  async findOne(id: string) {
    const cat = await this.catRepository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        age: true,
        breed: { name: true },
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      id: cat.id,
      name: cat.name,
      age: cat.age,
      breed: cat.breed ? cat.breed.name: 'Not Provided',
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
    };
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    const cat = await this.catRepository.findOneBy({ id });

    if (!cat) {
      throw new BadRequestException(`Cat not found: ${id}`);
    }

    const breed = await this.breedRepository.findOneBy({
      name: updateCatDto.breed
    });

    if (!breed) {
      throw new NotFoundException(`Breed not found: ${updateCatDto.breed}`);
    }

    const { affected } = await this.catRepository.update(id, {
      ...cat,
      ...updateCatDto,
      breed,
      updatedAt: new Date(),
    });

    if (!affected) {
      throw new BadRequestException(`Cannot update the cat: ${cat.name}`);
    }

    const updatedCat = await this.findOne(id);

    return {
      message: "Cat updated successfully",
      cat: updatedCat,
    };
  }

  async remove(id: string) {
    await this.catRepository.softDelete(id);

    return {
      message: "Cat deleted successfully"
    };
  }
}
