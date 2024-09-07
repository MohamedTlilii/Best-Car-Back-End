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
      createCarDto.image = file.path; // Multer will automatically provide the correct file path
    }
    // Ensure that isAvailable is a boolean
    createCarDto.isAvailable = Boolean(createCarDto.isAvailable);

    const newCar = this.carRepository.create(createCarDto);
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
    // Log the updateCarDto to check its content
    console.log('updateCarDto:', updateCarDto);
    console.log('Uploaded File:', file);

    const car = await this.carRepository.findOneBy({ id });
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found.`);
    }

    // If a new file is provided, update the image path
    if (file) {
      updateCarDto.image = file.path;
    }
    // console.log(updateCarDto);
    // Ensure that updateCarDto is not empty before proceeding with the update
    if (Object.keys(updateCarDto).length === 0) {
      throw new BadRequestException('No update values provided.');
    }

    await this.carRepository.update(id, updateCarDto);

    // Retrieve the updated car to return

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
