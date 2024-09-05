import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Public } from 'src/Guard/jwt-auth.guard';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const result = await this.loginService.login(loginUserDto);
    if (!result) {
      return { message: 'Invalid credentials' };
    }
    return { message: 'Login successful', ...result };
  }
}
