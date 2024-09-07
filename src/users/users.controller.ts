import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  //  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterModule } from '../user-auth/register/register.module';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: RegisterModule,
  ) {}

  @Get('getallusers')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('getuser/:id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(+id);
  }

  @Patch('updateuser/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete('deleteuser/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  }
}
