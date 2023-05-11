import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateWebsiteDto } from './dto';
import { WebsitesDomainService } from './websites.domain.service';

@Controller('websites')
export class WebsitesController {
  constructor(private readonly websitesDomainService: WebsitesDomainService) {}

  @Post()
  async newWebsite(@Body() websiteDto: CreateWebsiteDto) {
    const ownerId = 'someuserid';
    const newWebsite = await this.websitesDomainService.createNewWebsite(
      ownerId,
      websiteDto,
    );
    if (!newWebsite.id)
      throw new HttpException('SERVER_ERROR', HttpStatus.BAD_REQUEST);
  }
}
