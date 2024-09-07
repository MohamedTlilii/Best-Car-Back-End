export class CreateCarDto {
  name: string;
  description: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  color: string;
  mileage: number;
  isAvailable: boolean;
  // isNotAvailable: boolean;
  image?: string;
}
