import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const { email, password } = loginUserDto;

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException(
        'Email not found. Please check your email.',
      );
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Incorrect password. Please try again.');
    }

    const token = this.jwtService.sign(
      { id: user.id },
      { secret: process.env.JWT_SECRET },
    );

    return {
      message: 'Login successful',
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      age: user.age,
      isAdmin: user.isAdmin,
      role: user.role,
      image: user.image,
      token: token,
    };
  }
}
