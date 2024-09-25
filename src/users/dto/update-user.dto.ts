import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name: string;
  username: string;
  image?: string;
  email: string;
  age: number;
  password: string;
  confirmpassword: string;
  role?: 'admin' | 'superadmin';
}
