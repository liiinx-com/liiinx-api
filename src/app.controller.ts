import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const { name, version } = await this.appService.getApiInfo();
    return `${name} - ${version}`;
  }

  // TODO: admin only
  @Post('seed')
  async seedData() {
    return 'seeded';
  }
}
