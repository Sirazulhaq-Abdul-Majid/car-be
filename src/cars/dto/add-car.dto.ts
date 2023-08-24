import { Condition, Transmission } from "../enum"

export class AddCarDTO {
  model: string

  description: string

  condition: Condition

  brands: string

  transmission: Transmission

  image: string

  year: number

  engine_cc: number

  horse_power: number

  torque: number

}
