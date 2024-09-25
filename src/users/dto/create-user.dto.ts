import {
  IsString,
  IsInt,
  IsEmail,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  image?: string;

  @IsEmail()
  email: string;

  @IsInt()
  age: number;

  @IsString()
  password: string;

  @IsString()
  confirmpassword: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  @IsOptional()
  @IsString()
  role?: 'admin' | 'superadmin';
}
