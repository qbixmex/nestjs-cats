import { Cat } from "../../cats/entities/cat.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Breed {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Cat, (cat) => cat.id)
    cats: Cat[];
}
