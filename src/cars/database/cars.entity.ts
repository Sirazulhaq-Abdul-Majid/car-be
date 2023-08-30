import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Condition, Transmission } from "../enum";
import { Base } from "src/base/database/base.entity";
import { Users } from "src/users/database/users.entity";

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

  @Column({ nullable: true })
  image: string

  @Column()
  year: number

  @Column()
  engine_cc: number

  @Column()
  rating: number

  @Column({ nullable: true })
  horse_power: number

  @Column({ nullable: true })
  torque: number

  //relations
  @ManyToOne(() => Users, users => users.cars)
  users: Users
}
