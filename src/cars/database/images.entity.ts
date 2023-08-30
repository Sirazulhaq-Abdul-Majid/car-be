import { Base } from "src/base/database/base.entity";
import { Users } from "src/users/database/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cars } from "./cars.entity";

@Entity('images')
export class Images extends Base {
  @PrimaryGeneratedColumn()
  id: number

  @Column('mediumblob')
  image: Buffer

  //relations
  @ManyToOne(() => Cars, cars => cars.images)
  cars: Cars

}
