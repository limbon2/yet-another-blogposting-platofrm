import { Controller, Get, InternalServerErrorException } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getData() {
    throw new InternalServerErrorException();
    return this.appService.getData();
  }
}
