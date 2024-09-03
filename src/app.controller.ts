import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/naut')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // /naut/botilis
  @Get('/botilis')
  getHello(): string {
    return this.appService.getHello();
  }
}
