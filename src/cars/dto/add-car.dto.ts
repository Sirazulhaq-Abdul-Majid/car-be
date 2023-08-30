import { IsInt, IsNotEmpty, IsNumber, IsNumberString, IsString, Max, Min } from "class-validator"
import { Condition, Transmission } from "../enum"
import { Escape } from "class-sanitizer"
import { Transform, TransformFnParams } from "class-transformer"
import * as sanitizeHtml from 'sanitize-html'

export class AddCarDTO {
  @IsString()
  @IsNotEmpty()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  model: string

  @IsString()
  @IsNotEmpty()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  description: string

  @IsString()
  @IsNotEmpty()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  condition: Condition

  @IsString()
  @IsNotEmpty()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  brands: string

  @IsString()
  @IsNotEmpty()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  transmission: Transmission

  image: string

  @IsNotEmpty()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  year: number

  @IsNumberString()
  @IsNotEmpty()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  rating: number

  @IsNumberString()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  engine_cc: string

  @IsNumberString()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  horse_power: number

  @IsNumberString()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  torque: number
}
