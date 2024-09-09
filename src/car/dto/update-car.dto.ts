export class UpdateCarDto {
  name?: string;
  description?: string;
  brand?: string;
  model?: string;
  year?: number;
  price?: number;
  color?: string;
  mileage?: number;
  isAvailable?: 'true' | 'false';
  image?: string;
}
