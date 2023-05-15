import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWebsiteDto, WebpageDto, WebpageDtoBuilder } from './dto';
import { WebsitesService } from './websites.service';
import { WebpagesService } from 'src/webpages/webpages.service';
import { PageTypes } from 'src/webpages/types';
import { WebsiteBuilder } from './website-builder';

@Injectable()
export class WebsitesFacadeService {
  constructor(
    private websiteService: WebsitesService,
    private webpageService: WebpagesService,
    private websiteBuilder: WebsiteBuilder,
  ) {}

  async createNewWebsite(ownerId: string, websiteDto: CreateWebsiteDto) {
    const templateName = 'simple-template';
    const { handle } = websiteDto;
    if (await this.websiteService.getByHandle(handle)) {
      throw new HttpException('ALREADY_EXIST', HttpStatus.CONFLICT);
    }

    const newWebsite = await this.websiteService.save(
      await this.websiteBuilder
        .withTemplate(templateName, websiteDto)
        .then((builder) => builder.create(ownerId))
        .then((builder) => builder.addPages())
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

  async getPage(handle: string, pageSlug: string): Promise<WebpageDto> {
    const website = await this.websiteService.getByHandle(handle);
    if (!website)
      throw new HttpException('WEBSITE_NOT_FOUND', HttpStatus.NOT_FOUND);

    const layout = await this.webpageService.getByPageType(
      handle,
      PageTypes.LAYOUT,
    );
    if (!layout)
      throw new HttpException('LAYOUT_NOT_FOUND', HttpStatus.NOT_FOUND);

    const webpage = await this.webpageService.getBySlug(handle, pageSlug);
    if (!webpage)
      throw new HttpException('WEBPAGE_NOT_FOUND', HttpStatus.NOT_FOUND);

    return new WebpageDtoBuilder(website, layout, webpage)
      .buildLayout()
      .buildPage()
      .getDto();
  }
}
