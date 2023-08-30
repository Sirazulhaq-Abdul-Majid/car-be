import { IsNotEmpty, IsNumberString, IsString, } from "class-validator"
import { Condition, Transmission } from "../enum"
import { Escape } from "class-sanitizer"
import { Transform, TransformFnParams } from "class-transformer"
import * as sanitizeHtml from 'sanitize-html'
import { ApiProperty } from "@nestjs/swagger"

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

  image: any

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
