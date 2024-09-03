import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // Check if a user with the same username or email already exists
    const existingUser = await this.usersRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });
    // If a user with the same username or email exists, throw an exception
    if (existingUser) {
      if (existingUser.username === createUserDto.username) {
        throw new BadRequestException(
          'Username is already in use, please try another one.',
        );
      }
      if (existingUser.email === createUserDto.email) {
        throw new BadRequestException(
          'This email is already in use, please try another one.',
        );
      }
    }

    // Validate the email contains '@'
    if (!createUserDto.email.includes('@')) {
      throw new BadRequestException('Invalid email format');
    }

    // Check if password is provided
    if (!createUserDto.password) {
      throw new BadRequestException('Password is required');
    }

    // Validate the password
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!passwordRegex.test(createUserDto.password)) {
      throw new BadRequestException(
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character',
      );
    }
    // Ensure password and confirmPassword match
    if (createUserDto.password !== createUserDto.confirmpassword) {
      throw new BadRequestException(
        'Password and Confirm Password do not match',
      );
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const hashedConfirmPassword = await bcrypt.hash(
      createUserDto.confirmpassword,
      salt,
    );
    // Save the new user
    const newUser = this.usersRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
      confirmpassword: hashedConfirmPassword,
    });

    return await this.usersRepository.save(newUser);
  }

  findAll() {
    const users = this.usersRepository.find();
    return users;
    // return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Find the user by ID
    const existedUser = await this.usersRepository.findOneBy({ id: id });

    if (!existedUser) {
      throw new BadRequestException('User not found');
    }

    // Update the user's name with the new value
    existedUser.name = updateUserDto.name;

    // Save the updated user entity
    const updatedUser = await this.usersRepository.save(existedUser);
    return updatedUser;
  }

  async remove(id: number) {
    const deleteduser = await this.usersRepository.delete(id);
    return deleteduser;
  }
}
