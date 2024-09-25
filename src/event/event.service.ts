import {
  // BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Car } from '../car/entities/car.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async create(
    createEventDto: CreateEventDto,
    files: {
      identityCardFront?: Express.Multer.File[];
      identityCardBack?: Express.Multer.File[];
      permitFront?: Express.Multer.File[];
      permitBack?: Express.Multer.File[];
    },
  ): Promise<Event> {
    const carId = Number(createEventDto.carId);

    const car = await this.carRepository.findOne({ where: { id: carId } });
    if (!car) {
      throw new NotFoundException(`Car with ID ${carId} not found`);
    }

    const event = this.eventRepository.create({
      ...createEventDto,
      car,
      identityCardFront: files.identityCardFront?.[0]?.path,
      identityCardBack: files.identityCardBack?.[0]?.path,
      permitFront: files.permitFront?.[0]?.path,
      permitBack: files.permitBack?.[0]?.path,
    });

    return this.eventRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find({ relations: ['car'] });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['car'],
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    console.log(`Updating event with ID ${id}`);

    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['car'],
    });

    console.log('Found event:', event);

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    if (updateEventDto.carId) {
      const car = await this.carRepository.findOneBy({
        id: +updateEventDto.carId,
      });

      if (!car) {
        throw new NotFoundException(
          `Car with ID ${updateEventDto.carId} not found`,
        );
      }

      event.car = car;
    }

    Object.assign(event, updateEventDto);

    return this.eventRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    const result = await this.eventRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }
}
