import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender, Role, Status } from '../user.type';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  fname!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lname!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password!: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsDateString()
  dob?: Date;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  permanentAddress?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  presentAddress?: string;
}
