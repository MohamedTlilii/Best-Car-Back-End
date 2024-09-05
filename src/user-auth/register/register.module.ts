import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
