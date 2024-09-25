import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer.config';
import { Express } from 'express';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post('createcar')
  @UseInterceptors(FilesInterceptor('image', null, multerConfig)) // Use FilesInterceptor for multiple files
  async createCar(
    @Body() createCarDto: CreateCarDto,
    @UploadedFiles() images: Express.Multer.File[], // Correct decorator for multiple files
  ) {
    return this.carService.createCar(createCarDto, images);
  }

  @Get('getcars')
  getAllCars() {
    return this.carService.getAllCars();
  }

  @Get('getcar/:id')
  getCar(@Param('id') id: string) {
    return this.carService.getCar(+id);
  }

  @Patch('updatecar/:id')
  @UseInterceptors(FilesInterceptor('image', null, multerConfig)) // Use FilesInterceptor for multiple files
  async updateCar(
    @Param('id') id: string,
    @Body() updateCarDto: any,
    @UploadedFiles() images?: Express.Multer.File[], // Correct decorator for multiple files
  ) {
    if (images && images.length) {
      updateCarDto.image = images.map((file) => file.path);
    }
    if (Object.keys(updateCarDto).length === 0) {
      throw new BadRequestException('No update values provided.');
    }
    return this.carService.updateCar(+id, updateCarDto, images);
  }

  @Delete('removecar/:id')
  removeCar(@Param('id') id: string) {
    return this.carService.removeCar(+id);
  }
}
