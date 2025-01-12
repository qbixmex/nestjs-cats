import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: true,
    default: 'Not Provided'
  })
  name: string;

  @Column({
    unique: true,
    nullable: false
  })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({
    default: 'user',
    nullable: true
  })
  role: string;

  @CreateDateColumn()
  createdAt: Date;
    
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
