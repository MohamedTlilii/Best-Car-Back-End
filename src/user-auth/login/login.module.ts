import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
//import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {
  // constructor() {
  //   // console.log('JWT_SECRET:', process.env.JWT_SECRET);
  // }
}
