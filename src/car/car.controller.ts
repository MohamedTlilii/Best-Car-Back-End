import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer.config';
import { Express, Request } from 'express';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post('createcar')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async createCar(
    @Body() createCarDto: CreateCarDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    console.log('Uploaded file:', image);
    if (image) {
      createCarDto.image = image.path;
    }
    return this.carService.createCar(createCarDto, image);
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
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async updateCar(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
    @UploadedFile() image?: Express.Multer.File,
    @Req() req?: Request,
  ) {
    console.log('Request Body:', req?.body);
    console.log('Uploaded File:', image);
    console.log('Update Car DTO:', updateCarDto);

    if (image) {
      updateCarDto.image = image.path;
    }
    if (Object.keys(updateCarDto).length === 0) {
      throw new BadRequestException('No update values provided.');
    }
    return this.carService.updateCar(+id, updateCarDto, image);
  }

  @Delete('removecar/:id')
  removeCar(@Param('id') id: string) {
    return this.carService.removeCar(+id);
  }
}
