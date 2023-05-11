import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { WebsitesSeederService } from './websites/websites.seeder';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly websitesSeeder: WebsitesSeederService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const { name, version } = await this.appService.getApiInfo();
    return `${name} - ${version}`;
  }

  // TODO: admin only
  @Post('seed')
  async seedData() {
    return this.websitesSeeder.seed();
  }
}
