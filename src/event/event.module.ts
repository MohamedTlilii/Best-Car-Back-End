import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../event/entities/event.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Car } from '../car/entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Car])],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
