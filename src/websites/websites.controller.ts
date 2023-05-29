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
import { CreateWebpageDto } from 'src/webpages/dto/webpage.dto';

@Controller('websites')
export class WebsitesController {
  constructor(private readonly websitesFacadeService: WebsitesFacadeService) {}

  @Get(':handle/pages/:slug')
  async getPage(
    @Param('handle') handle: string,
    @Param('slug') pageSlug = 'home',
    @Query('lang') lang = 'EN',
  ) {
    return this.websitesFacadeService.getWebpage(handle, pageSlug);
  }

  @Post()
  async newWebsite(@Body() websiteDto: CreateWebsiteDto) {
    const ownerId = 'someuserid';
    const newWebsite = await this.websitesFacadeService.newWebsite(
      ownerId,
      websiteDto,
    );
    if (!newWebsite.id)
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
  }

  @Post(':handle/pages')
  async newWebpage(
    @Param('handle') handle: string,
    @Body() webpageDto: CreateWebpageDto,
  ) {
    const ownerId = 'someuserid';
    const newPage = await this.websitesFacadeService.newWebpage(
      handle,
      webpageDto,
    );
    console.log('newPage :>> ', newPage);

    // if (!newWebsite.id)
    //   throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
  }
}
