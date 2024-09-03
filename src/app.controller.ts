import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/naut')
  getHello(): string {
    return this.appService.getNaut();
  }

  @Get('/emna')
  gethelloemna() {
    return this.appService.getEmna();
  }

  @Post('/emna')
  post0(@Query() userName) {
    return userName;
    return this.appService.postQuery();
  }

  @Post('/emna/:name/:age/:number')
  post1(@Param() params) {
    return params;
    return this.appService.postParams();
  }

  @Post('/body')
  post2(@Body('name') name: string) {
    return name;
    return this.appService.postBody(name);
  }
}
