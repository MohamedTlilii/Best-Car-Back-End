import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  name?: string;
  description?: string;
  brand?: string;
  model?: string;
  year?: number;
  price?: number;
  color?: string;
  mileage?: number; // Ensure this is a number
  isAvailable?: boolean; // Use boolean for true/false
  // isNotAvailable?: boolean;
  image?: string; // Optional field
}
