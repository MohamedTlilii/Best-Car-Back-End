import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import {
  FileFieldsInterceptor,
  // FilesInterceptor,
} from '@nestjs/platform-express';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('createevent')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'identityCardFront', maxCount: 1 },
        { name: 'identityCardBack', maxCount: 1 },
        { name: 'permitFront', maxCount: 1 },
        { name: 'permitBack', maxCount: 1 },
      ],
      {
        dest: './uploads',
      },
    ),
  )
  async create(
    @Body() createEventDto: CreateEventDto,
    @UploadedFiles()
    files: {
      identityCardFront?: Express.Multer.File[];
      identityCardBack?: Express.Multer.File[];
      permitFront?: Express.Multer.File[];
      permitBack?: Express.Multer.File[];
    },
  ) {
    console.log('Received files:', files);
    console.log('Received body:', createEventDto);

    return this.eventService.create(
      {
        ...createEventDto,
      },
      files,
    );
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
