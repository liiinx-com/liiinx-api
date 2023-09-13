import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WebsitesService } from './websites.service';
import { WebpagesService } from 'src/webpages/webpages.service';
import { WebsiteBuilder } from './website-builder';
import { CreateWebsiteDto } from './dto/website.dto';
import { WebpageDtoBuilder } from 'src/webpages/dto/webpage.dto-builder';
import { CreateWebpageDto, WebpageDto } from 'src/webpages/dto/webpage.dto';
import { PageType } from 'src/webpages/entities/page-type';
import { ProfileService } from 'src/profile/profile.service';
import {
  ALREADY_EXIST,
  LAYOUT_NOT_FOUND,
  SERVER_ERROR,
  WEBPAGE_NOT_FOUND,
  WEBSITE_NOT_FOUND,
} from 'src/shared/error-codes';
import { EntityManager } from 'typeorm';
import { Website } from './entities/website.entity';
import { Webpage } from 'src/webpages/entities/webpage.entity';

@Injectable()
export class WebsiteFacadeService {
  constructor(
    private entityManager: EntityManager,
    private websiteService: WebsitesService,
    private webpageService: WebpagesService,
    private websiteBuilder: WebsiteBuilder,
    private webpageDtoBuilder: WebpageDtoBuilder,
    private profileService: ProfileService,
  ) {}

  async newWebsite(
    ownerId: string,
    websiteDto: CreateWebsiteDto,
  ): Promise<Website> {
    const { handle } = websiteDto;

    if (await this.websiteService.getByHandle(handle)) {
      throw new HttpException(ALREADY_EXIST, HttpStatus.CONFLICT);
    }

    const themeCode = 'heem';

    let newWebsite: Website = null;
    await this.entityManager.transaction(async (manager) => {
      newWebsite = await this.websiteBuilder
        .create(manager, ownerId, websiteDto)
        .then((builder) => builder.addLayout(themeCode))
        .then((builder) => builder.getWebsite());
    });
    return newWebsite;
  }

  async newWebpage(
    handle: string,
    webpageDto: CreateWebpageDto,
  ): Promise<string> {
    // TODO: move to a guard and other instances
    const website = await this.websiteService.getByHandle(handle);
    if (!website)
      throw new HttpException(WEBSITE_NOT_FOUND, HttpStatus.NOT_FOUND);

    try {
      let newWebpage: Webpage = null;
      await this.entityManager.transaction(async (manager) => {
        newWebpage = await this.webpageService.createPage(
          manager,
          website.id,
          webpageDto,
        );
        // return newWebpage;
      });
      return 'WEBPAGE_CREATED';
    } catch (e) {
      console.error(e);
      throw new HttpException(SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getWebpage(handle: string, pageSlug: string): Promise<WebpageDto> {
    const webpage = await this.webpageService.getBySlug(handle, pageSlug);

    if (!webpage)
      throw new HttpException(WEBPAGE_NOT_FOUND, HttpStatus.NOT_FOUND);

    const layout = await this.webpageService.getByPageType(
      handle,
      PageType.LAYOUT,
    );
    if (!layout)
      throw new HttpException(LAYOUT_NOT_FOUND, HttpStatus.NOT_FOUND);

    // TODO: implement this
    // 1. build page based on the pageType with all the dynamic settings
    // 2. merge with the webpage and layout

    return this.webpageDtoBuilder
      .createDto(layout, webpage)
      .then((builder) => builder.buildLayoutDto())
      .then((builder) => builder.buildPageDto())
      .then((builder) => builder.buildThemeDto())
      .then((builder) => builder.withMenusDto())
      .then((builder) => builder.withProfileDto())
      .then((builder) => builder.getDto());
  }
}
