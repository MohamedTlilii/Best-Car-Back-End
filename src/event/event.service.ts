import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const { carId, ...eventData } = createEventDto;

    // Debugging: Log the received DTO
    console.log('Received CreateEventDto:', createEventDto);

    // Convert carId to number and validate it
    const parsedCarId = parseInt(carId, 10);
    if (isNaN(parsedCarId)) {
      throw new BadRequestException(`Invalid carId: ${carId}`);
    }

    const car = await this.carRepository.findOneBy({ id: parsedCarId });

    if (!car) {
      throw new NotFoundException(`Car with ID ${parsedCarId} not found`);
    }

    const event = this.eventRepository.create({ ...eventData, car });
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
  
    // Fetch the event from the database
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['car'],
    });
  
    console.log('Found event:', event);
  
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  
    // If carId is provided, update the car relationship
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
  
    // Update event properties
    Object.assign(event, updateEventDto);
  
    // Save the updated event
    return this.eventRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    const result = await this.eventRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }
}
