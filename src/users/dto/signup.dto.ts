import { Escape } from "class-sanitizer"
import { Transform, TransformFnParams } from "class-transformer"
import { IsAlpha, IsAlphanumeric, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"
import * as sanitizeHtml from 'sanitize-html'

export class SignupDTO {

  @IsString()
  @IsNotEmpty()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  full_name: string

  @IsEmail()
  @IsNotEmpty()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  email: string

  @MinLength(8)
  @IsNotEmpty()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  password: string

  @IsAlphanumeric()
  @IsNotEmpty()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  login_id: string

  @IsNotEmpty()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  @IsAlpha()
  state: string

  @IsNotEmpty()
  @Escape()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  @IsAlpha()
  city: string
}
