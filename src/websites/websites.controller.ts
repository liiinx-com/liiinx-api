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
import { WebsiteFacadeService } from './websites.facade';
import { CreateWebsiteDto, WebsiteDto } from './dto/website.dto';
import { CreateWebpageDto, PageDto } from 'src/webpages/dto/webpage.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { WebsitesService } from './websites.service';
import { User } from 'src/users/entities/user.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Website } from './entities/website.entity';
import { WebpagesService } from 'src/webpages/webpages.service';
import { Webpage } from 'src/webpages/entities/webpage.entity';

@Controller('websites')
export class WebsitesController {
  constructor(
    private readonly websiteFacadeService: WebsiteFacadeService,
    private readonly websiteService: WebsitesService,
    private readonly webpageService: WebpagesService,
    @InjectMapper()
    private mapper: Mapper,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMyWebsites(@Request() req): Promise<WebsiteDto[]> {
    const user: User = req.user;

    return this.mapper.mapArray(
      await this.websiteService.findAllByUser(user.id),
      Website,
      WebsiteDto,
    );
  }

  @Get(':handle/pages/')
  @UseGuards(JwtAuthGuard)
  // TODO: websiteExists(handle)Guard
  async getWebsitePages(
    @Request() { user },
    @Param('handle') handle: string,
    @Query('lang') lang = 'EN',
  ) {
    return this.mapper.mapArray(
      await this.webpageService.getWebsitePages(handle),
      Webpage,
      PageDto,
    );
  }

  @Get(':handle/pages/:slug')
  // @UseGuards( InjectWebpageGuard)
  // TODO: websiteExists(handle)Guard
  // TODO: webpageExistsGuard
  async getPage(
    @Param('handle') handle: string,
    @Param('slug') pageSlug = 'home',
    @Query('lang') lang = 'EN',
  ) {
    return this.websiteFacadeService.getWebpage(handle, pageSlug);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  // TODO: websiteNotExistsGuard
  async newWebsite(@Request() { user }, @Body() websiteDto: CreateWebsiteDto) {
    return this.websiteFacadeService.newWebsite(user.id, websiteDto);
    // if (!newWebsite.id)
    //   throw new HttpException(BAD_REQUEST, HttpStatus.BAD_REQUEST);
  }

  @Post(':handle/pages')
  @UseGuards(JwtAuthGuard)
  // TODO: websiteExists(handle)Guard
  async newWebpage(
    @Request() { user },
    @Param('handle') handle: string,
    @Body() newPageDto: CreateWebpageDto,
  ) {
    return this.websiteFacadeService.newWebpage(handle, newPageDto);

    // if (!newWebsite.id)
    //   throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
  }
}
