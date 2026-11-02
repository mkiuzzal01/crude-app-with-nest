import {
  IsInt,
  IsPositive,
  IsString,
  IsOptional,
  Length,
  IsIn,
  IsNumber,
} from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsPositive()
  productId!: number;

  @IsInt()
  @IsPositive()
  quantity!: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  total!: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  vat?: number;

  @IsOptional()
  @IsString()
  @Length(1, 10)
  currencySymbol?: string;

  @IsOptional()
  @IsString()
  @Length(3, 50)
  couponCode?: string;

  @IsOptional()
  @IsIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
  status!: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}
