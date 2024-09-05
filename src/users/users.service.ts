import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getAllUsers() {
    const users = this.usersRepository.find();
    return users;
  }

  async getUser(id: number) {
    // Find the user by ID
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return { message: `User with id #${id} fetched successfully`, user };
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    // Find the user by ID
    const existedUser = await this.usersRepository.findOneBy({ id: id });

    if (!existedUser) {
      throw new BadRequestException('User not found');
    }

    // Update the user's name with the new value
    existedUser.name = updateUserDto.name;

    // Save the updated user entity
    const updatedUser = await this.usersRepository.save(existedUser);
    return { message: 'User updated successfully', updatedUser };
  }

  async removeUser(id: number) {
    await this.usersRepository.delete(id);
    return { message: 'User removed successfully' };
  }
}
