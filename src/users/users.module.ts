import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RegisterModule } from '../user-auth/register/register.module';
import { LoginModule } from 'src/user-auth/login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, RegisterModule, LoginModule],
  controllers: [UsersController],
  // exports: [UsersService],
})
export class UsersModule {}
