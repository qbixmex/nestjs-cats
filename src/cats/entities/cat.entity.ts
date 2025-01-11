import { Breed } from "../../breeds/entities/breed.entity";
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  
} from "typeorm";

@Entity()
export class Cat {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "int", width: 2 })
  age: number;

  @ManyToOne(
    () => Breed,
    (breed) => breed.id,
    { eager: true }
  )
  breed: Breed;

  @DeleteDateColumn()
  deletedAt: Date;
}
