import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWebsiteDto, WebpageDto, WebpageDtoBuilder } from './dto';
import { WebsitesService } from './websites.service';
import { WebpagesService } from 'src/webpages/webpages.service';
import { WebpageBuilder } from 'src/webpages/webpage-builder';
import { PageTypes } from 'src/webpages/types';

@Injectable()
export class WebsitesFacadeService {
  constructor(
    private websiteService: WebsitesService,
    private webpageService: WebpagesService,
    private webpageBuilder: WebpageBuilder,
  ) {}

  async createNewWebsite(ownerId: string, websiteDto: CreateWebsiteDto) {
    const saveWebsite = await this.websiteService.create(ownerId, websiteDto);
    this.webpageService.saveBulk(
      await this.webpageBuilder.getPagesByTemplate(
        'simple-template',
        saveWebsite,
      ),
    );
    return saveWebsite;
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
