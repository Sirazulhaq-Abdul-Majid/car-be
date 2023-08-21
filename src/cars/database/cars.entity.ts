import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Brands, Condition, Transmission } from "../enum";
import { Base } from "src/base/database/base.entity";

@Entity('cars')
export class Cars extends Base {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  description: string

  @Column()
  condition: Condition

  @Column()
  brands: Brands

  @Column()
  model: string

  @Column()
  transmission: Transmission

  @Column()
  image: string

  @Column()
  year: number

  @Column()
  engine_cc: number

  @Column()
  horse_power: number

  @Column()
  torque: number
}
