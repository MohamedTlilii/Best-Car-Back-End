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
    files?: Express.Multer.File[],
  ): Promise<{ message: string; car: Car }> {
    try {
      console.log('Received DTO:', createCarDto);
      if (files && files.length) {
        createCarDto.image = files.map((file) => file.path);
      }

      // createCarDto.price = parseInt(
      //   (createCarDto.price as any).replace(/\s+/g, ''),
      //   10,
      // );

      const newCar = this.carRepository.create({
        ...createCarDto,
        disponibilite: createCarDto.disponibilite ?? 'available',
      });

      console.log('Saving car:', newCar);

      const savedCar: Car = await this.carRepository.save(newCar);

      console.log('Car saved successfully:', savedCar);

      return {
        message: 'Car successfully created!',
        car: savedCar,
      };
    } catch (error) {
      console.error('Error creating car:', error);
      throw new BadRequestException(`Error creating car: ${error.message}`);
    }
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
    files?: Express.Multer.File[],
  ): Promise<{ message: string; car: Car }> {
    console.log(updateCarDto);
    const car = await this.carRepository.findOneBy({ id });
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found.`);
    }

    const keys = Object.keys(updateCarDto);
    const payload = {};
    keys.forEach((key) => {
      if (updateCarDto[key]) payload[key] = updateCarDto[key];
    });
    console.log(payload);

    if (files && files.length) {
      payload['image'] = files.map((file) => file.path);
    }

    if (Object.keys(payload).length === 0) {
      throw new BadRequestException('No update values provided.');
    }

    console.log('Updating car with ID:', id, 'Data:', payload);

    await this.carRepository.update(id, {
      ...payload,
    });

    const updatedCar = await this.carRepository.findOneBy({ id });

    console.log('Car updated successfully:', updatedCar);

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
