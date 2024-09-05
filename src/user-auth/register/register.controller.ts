import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { Public } from 'src/Guard/jwt-auth.guard';

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}
  @Public()
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.registerService.register(createUserDto);
  }
}
