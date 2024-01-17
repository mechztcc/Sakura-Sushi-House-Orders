import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  products: { id: number; name: string; price: string; count: number }[];

  @IsNotEmpty()
  preferences: string;
}
