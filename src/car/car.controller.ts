import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Public } from 'src/Guard/jwt-auth.guard';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post('createcar')
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carService.createCar(createCarDto);
  }
  @Public()
  @Get('getcars')
  getAllCars() {
    return this.carService.getAllCars();
  }
  @Public()
  @Get('getcar/:id')
  getCar(@Param('id') id: string) {
    return this.carService.getCar(+id);
  }

  @Patch('updatecar/:id')
  updateCar(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.updateCar(+id, updateCarDto);
  }

  @Delete('removecar/:id')
  removeCar(@Param('id') id: string) {
    return this.carService.removeCar(+id);
  }
}
