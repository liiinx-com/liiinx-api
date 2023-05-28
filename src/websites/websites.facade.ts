import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WebsitesService } from './websites.service';
import { WebpagesService } from 'src/webpages/webpages.service';
import { WebsiteBuilder } from './website-builder';
import { CreateWebpageDto, CreateWebsiteDto } from './dto/website.dto';
import { WebpageDtoBuilder } from 'src/webpages/dto/webpage.dto-builder';
import { WebpageDto } from 'src/webpages/dto/webpage.dto';
import { PageTypes } from 'src/webpages/entities/webpage.entity';

@Injectable()
export class WebsitesFacadeService {
  constructor(
    private websiteService: WebsitesService,
    private webpageService: WebpagesService,
    private websiteBuilder: WebsiteBuilder,
    private webpageDtoBuilder: WebpageDtoBuilder,
  ) {}

  async newWebsite(ownerId: string, websiteDto: CreateWebsiteDto) {
    const { handle, themeCode } = websiteDto;
    if (await this.websiteService.getByHandle(handle)) {
      throw new HttpException('ALREADY_EXIST', HttpStatus.CONFLICT);
    }

    const newWebsite = await this.websiteService.save(
      await this.websiteBuilder
        .create(ownerId, websiteDto)
        .then((builder) => builder.addLayout(themeCode))
        .then((builder) => builder.getWebsite())
        .catch((error) => {
          console.error(error);
          throw new HttpException(
            'SERVER_ERROR',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
    );

    // add to sync-content queue

    return newWebsite;
  }

  async newWebpage(
    handle: string,
    webpageDto: CreateWebpageDto,
  ): Promise<string> {
    // TODO: move to a guard and other instances
    const website = await this.websiteService.getByHandle(handle);
    if (!website)
      throw new HttpException('WEBSITE_NOT_FOUND', HttpStatus.NOT_FOUND);

    // 1. build empty page based on the pageType with all the settings needed to be persisted
    // 2. merge with the given input

    const webpage = await this.webpageService.createPage(webpageDto);
    webpage.website = website;
    await this.webpageService.save(webpage);

    return 'WEBPAGE_CREATED';
  }

  async getWebpage(handle: string, pageSlug: string): Promise<WebpageDto> {
    const website = await this.websiteService.getByHandle(handle);
    if (!website)
      throw new HttpException('WEBSITE_NOT_FOUND', HttpStatus.NOT_FOUND);

    const webpage = await this.webpageService.getBySlug(handle, pageSlug);
    if (!webpage)
      throw new HttpException('WEBPAGE_NOT_FOUND', HttpStatus.NOT_FOUND);

    const layout = await this.webpageService.getByPageType(
      handle,
      PageTypes.LAYOUT,
    );
    if (!layout)
      throw new HttpException('LAYOUT_NOT_FOUND', HttpStatus.NOT_FOUND);

    // 1. build page based on the pageType with all the dynamic settings
    // 2. merge with the webpage and layout

    return this.webpageDtoBuilder
      .createDto(website, layout, webpage)
      .then((builder) => builder.buildLayoutDto())
      .then((builder) => builder.buildPageDto())
      .then((builder) => builder.buildThemeDto())
      .then((builder) => builder.getDto());
  }
}
