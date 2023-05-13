import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateWebsiteDto } from './dto';
import { WebsitesFacadeService } from './websites.facade';

@Controller('websites')
export class WebsitesController {
  constructor(private readonly websitesFacadeService: WebsitesFacadeService) {}

  @Post()
  async newWebsite(@Body() websiteDto: CreateWebsiteDto) {
    const ownerId = 'someuserid';
    const newWebsite = await this.websitesFacadeService.createNewWebsite(
      ownerId,
      websiteDto,
    );
    if (!newWebsite.id)
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
  }
}
