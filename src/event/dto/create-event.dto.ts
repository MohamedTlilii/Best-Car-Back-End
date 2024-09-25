import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  note: string;

  @IsNotEmpty()
  @IsString()
  startdate: string;

  @IsNotEmpty()
  @IsString()
  enddate: string;

  @IsOptional()
  @IsString()
  identityCardFront?: string;

  @IsOptional()
  @IsString()
  identityCardBack?: string;

  @IsOptional()
  @IsString()
  permitFront?: string;

  @IsOptional()
  @IsString()
  permitBack?: string;

  @IsNotEmpty()
  @IsString()
  carId: string;
}
