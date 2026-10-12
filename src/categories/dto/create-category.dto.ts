import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string;

  @IsString()
  description?: string | undefined;
  @IsUrl()
  image?: string;
}
