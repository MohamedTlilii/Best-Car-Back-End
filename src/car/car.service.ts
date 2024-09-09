import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async createCar(
    createCarDto: CreateCarDto,
    file: Express.Multer.File,
  ): Promise<{ message: string; car: Car }> {
    if (file) {
      createCarDto.image = file.path;
    }

    const newCar = this.carRepository.create({
      ...createCarDto,
      isAvailable: createCarDto.isAvailable === 'true',
    });
    const savedCar = await this.carRepository.save(newCar);
    return {
      message: 'Car successfully created!',
      car: savedCar,
    };
  }

  async getAllCars(): Promise<{ message: string; cars: Car[] }> {
    const cars = await this.carRepository.find();
    return {
      message: cars.length ? 'Cars retrieved successfully!' : 'No cars found.',
      cars,
    };
  }

  async getCar(id: number): Promise<{ message: string; car: Car }> {
    const car = await this.carRepository.findOneBy({ id });
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found.`);
    }
    return {
      message: 'Car retrieved successfully!',
      car,
    };
  }

  async updateCar(
    id: number,
    updateCarDto: UpdateCarDto,
    file?: Express.Multer.File,
  ): Promise<{ message: string; car: Car }> {
    console.log('updateCarDto:', updateCarDto);
    console.log('Uploaded File:', file);

    const car = await this.carRepository.findOneBy({ id });
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found.`);
    }

    if (file) {
      updateCarDto.image = file.path;
    }
    if (Object.keys(updateCarDto).length === 0) {
      throw new BadRequestException('No update values provided.');
    }

    await this.carRepository.update(id, {
      ...updateCarDto,
      isAvailable: updateCarDto.isAvailable === 'true',
    });

    const updatedCar = await this.carRepository.findOneBy({ id });
    return {
      message: 'Car updated successfully!',
      car: updatedCar,
    };
  }

  async removeCar(id: number): Promise<{ message: string }> {
    const result = await this.carRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Car with ID ${id} not found.`);
    }
    return {
      message: `Car with ID ${id} has been successfully deleted.`,
    };
  }
}
