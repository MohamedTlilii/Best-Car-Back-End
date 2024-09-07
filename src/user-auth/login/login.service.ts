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

    // 1. Find the user by email
    const user = await this.usersRepository.findOne({ where: { email } });

    // 2. If user is not found, throw an unauthorized exception
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Compare the provided password with the stored hashed password
    const isPasswordMatching = await bcrypt.compare(password, user.password);

    // 4. If the password does not match, throw an unauthorized exception
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 5. Generate JWT token using the user's ID
    const token = this.jwtService.sign(
      { id: user.id }, // Payload (data to be signed into the token)
      { secret: process.env.JWT_SECRET }, // Secret key for signing the token
    );

    // 6. Return the desired user information along with the token
    return {
      message: 'Login successful',
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      age: user.age,
      isAdmin: user.isAdmin,
      token: token,
    };
  }
}
