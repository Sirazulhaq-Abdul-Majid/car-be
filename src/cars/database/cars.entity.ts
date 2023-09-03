import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Condition, Transmission } from "../enum";
import { Base } from "src/base/database/base.entity";
import { Users } from "src/users/database/users.entity";
import { Images } from "./images.entity";

@Entity('cars')
export class Cars extends Base {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  description: string

  @Column({ default: 0 })
  visit: number

  @Column()
  condition: Condition

  @Column()
  brands: string

  @Column()
  model: string

  @Column()
  transmission: Transmission

  @Column()
  year: number

  @Column()
  engine_cc: number

  @Column({ default: 0 })
  rating: number

  @Column({ nullable: true })
  horse_power: number

  @Column({ nullable: true })
  torque: number

  //relations
  @ManyToOne(() => Users, users => users.cars)
  users: Users

  @OneToMany(() => Images, images => images.cars)
  images: Images[]
}
