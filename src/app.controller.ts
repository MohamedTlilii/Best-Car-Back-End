import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './Guard/jwt-auth.guard';

@Public()
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }
}
