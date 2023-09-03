import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WebsitesFacadeService } from './websites.facade';
import { CreateWebsiteDto } from './dto/website.dto';
import { CreateWebpageDto } from 'src/webpages/dto/webpage.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

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
  @UseGuards(JwtAuthGuard)
  async newWebsite(@Request() { user }, @Body() websiteDto: CreateWebsiteDto) {
    const ownerId = 'someuserid';

    const newWebsite = await this.websitesFacadeService.newWebsite(
      ownerId,
      websiteDto,
    );
    if (!newWebsite.id)
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
  }

  @Post(':handle/pages')
  @UseGuards(JwtAuthGuard)
  async newWebpage(
    @Request() { user },
    @Param('handle') handle: string,
    @Body() webpageDto: CreateWebpageDto,
  ) {
    const newPage = await this.websitesFacadeService.newWebpage(
      handle,
      webpageDto,
    );

    // if (!newWebsite.id)
    //   throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
  }
}
