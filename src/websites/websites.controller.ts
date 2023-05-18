import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { WebsitesFacadeService } from './websites.facade';
import { CreateWebsiteDto } from './dto/website.dto';

@Controller('websites')
export class WebsitesController {
  constructor(private readonly websitesFacadeService: WebsitesFacadeService) {}

  @Get(':handle/pages/:slug')
  async getPage(
    @Param('handle') handle: string,
    @Param('slug') pageSlug = 'home',
    @Query('lang') lang = 'EN',
  ) {
    return this.websitesFacadeService.getPage(handle, pageSlug);
  }

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
