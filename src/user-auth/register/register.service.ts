import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../users/dto/create-user.dto';
@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    await this.validateUserData(createUserDto);

    const hashedPassword = await this.hashPassword(createUserDto.password);

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.usersRepository.save(newUser);
    return { message: 'User created successfully' };
  }

  private async validateUserData(createUserDto: CreateUserDto): Promise<void> {
    const { username, email, password, confirmpassword } = createUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        throw new BadRequestException('Username is already in use');
      }
      if (existingUser.email === email) {
        throw new BadRequestException('Email is already in use');
      }
    }

    if (!email.includes('@')) {
      throw new BadRequestException('Invalid email format');
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new BadRequestException(
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character',
      );
    }

    if (password !== confirmpassword) {
      throw new BadRequestException('Passwords do not match');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
