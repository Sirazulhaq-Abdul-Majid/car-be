import { IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { Condition, Transmission } from "../enum";
import { Escape } from "class-sanitizer";
import { Transform, TransformFnParams } from "class-transformer";
import * as sanitizeHtml from "sanitize-html";
import { ApiProperty } from "@nestjs/swagger";

export class EditCarDto {
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  model: string;

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  description: string;

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  condition: Condition;

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  brands: string;

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  transmission: Transmission;

  image: any;

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  year: number;

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  rating: number;

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  engine_cc: string;

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  horse_power: number;

  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  torque: number;
}
