import { Condition, Transmission } from "../enum"
import { Escape } from "class-sanitizer"
import { Transform, TransformFnParams } from "class-transformer"
import * as sanitizeHtml from 'sanitize-html'

export class SearchCarDTO {

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  brands: string

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  model: string

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  transmission: Transmission

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  type: Transmission

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  year_start: number
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  year_end: number

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  engine_cc_start: number
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  engine_cc_end: number

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  horse_power_start: number
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  horse_power_end: number

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  torque_start: number
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  torque_end: number

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  price_start: number
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  price_end: number

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  condition: Condition
}
