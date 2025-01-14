import Role from "../../common/enums/role.enum";
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

  @Column({ nullable: false, select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
    nullable: true,
  })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;
    
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
