import { Breed } from "../../breeds/entities/breed.entity";
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  
} from "typeorm";

@Entity()
export class Cat {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "int", width: 2 })
  age: number;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => Breed,
    (breed) => breed.id,
    { eager: true }
  )
  breed: Breed;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "userEmail",
    referencedColumnName: "email",
  })
  user: User;

  @Column()
  userEmail: string;
}
