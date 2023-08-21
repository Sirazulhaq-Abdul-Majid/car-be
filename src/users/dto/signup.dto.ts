import { IsAlphanumeric, IsEmail, IsString, MinLength } from "class-validator"

export class SignupDTO {

  @IsString()
  full_name: string

  @IsEmail()
  email: string

  @IsAlphanumeric()
  @MinLength(8)
  password: string

  @IsAlphanumeric()
  login_id: string
}
