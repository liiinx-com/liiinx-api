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
import { CreateWebpageDto } from 'src/webpages/dto/webpage.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { WebsitesService } from './websites.service';
import { User } from 'src/users/entities/user.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Website } from './entities/website.entity';
import { BAD_REQUEST } from 'src/shared/error-codes';

@Controller('websites')
export class WebsitesController {
  constructor(
    private readonly websiteFacadeService: WebsiteFacadeService,
    private readonly websiteService: WebsitesService,
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
  async getWebsitePages(
    @Request() { user },
    @Param('handle') handle: string,
    @Query('lang') lang = 'EN',
  ) {
    return 'shish'; //this.websiteFacadeService.getWebpage(handle, pageSlug);
  }

  @Get(':handle/pages/:slug')
  async getPage(
    @Param('handle') handle: string,
    @Param('slug') pageSlug = 'home',
    @Query('lang') lang = 'EN',
  ) {
    return this.websiteFacadeService.getWebpage(handle, pageSlug);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async newWebsite(@Request() { user }, @Body() websiteDto: CreateWebsiteDto) {
    const newWebsite = await this.websiteFacadeService.newWebsite(
      user.id,
      websiteDto,
    );
    if (!newWebsite.id)
      throw new HttpException(BAD_REQUEST, HttpStatus.BAD_REQUEST);
  }

  @Post(':handle/pages')
  @UseGuards(JwtAuthGuard)
  async newWebpage(
    @Request() { user },
    @Param('handle') handle: string,
    @Body() webpageDto: CreateWebpageDto,
  ) {
    const newPage = await this.websiteFacadeService.newWebpage(
      handle,
      webpageDto,
    );

    // if (!newWebsite.id)
    //   throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
  }
}
