import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  fname!: string;

  @IsNotEmpty()
  lname!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;
}
