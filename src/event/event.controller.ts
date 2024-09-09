import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('createevent')
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get('getevents')
  findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get('getevent/:id')
  findOne(@Param('id') id: number): Promise<Event> {
    return this.eventService.findOne(id);
  }

  @Patch('updateevent/:id')
  update(
    @Param('id') id: number,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete('deleteevent/:id')
  remove(@Param('id') id: number): Promise<void> {
    return this.eventService.remove(id);
  }
}
