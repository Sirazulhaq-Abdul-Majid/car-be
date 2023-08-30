import { IsNotEmpty, IsString } from "class-validator"
import { Condition, Transmission } from "../enum"
import { Escape } from "class-sanitizer"
import { Transform, TransformFnParams } from "class-transformer"
import * as sanitizeHtml from 'sanitize-html'

export class SearchCarDTO {

  @IsString()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  brands: string

  @IsString()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  model: string

  @IsString()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  transmission: Transmission

  @IsString()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  year_start: number
  @IsString()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  year_end: number

  @IsString()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  engine_cc_start: number
  @IsString()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  engine_cc_end: number

  @IsString()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  horse_power_start: number
  @IsString()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  horse_power_end: number

  @IsString()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  torque_start: number
  @IsString()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  torque_end: number

  @IsString()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  condition: Condition
}
