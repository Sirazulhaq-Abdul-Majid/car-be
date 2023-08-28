import { IsEnum } from "class-validator"
import { Condition, Transmission } from "../enum"

export class SearchCarDTO {

  brands: string

  model: string

  transmission: Transmission

  year_start: number
  year_end: number

  engine_cc_start: number
  engine_cc_end: number

  horse_power_start: number
  horse_power_end: number

  torque_start: number
  torque_end: number

  @IsEnum(Condition)
  condition: Condition
}
