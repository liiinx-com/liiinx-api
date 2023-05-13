import { WebPage } from 'src/webpages/entities/webpage.entity';
import { Website } from '../entities/website.entity';
import { WebpageDto } from './webpage.dto';

interface IWebpageDtoBuilder {
  getDto(): WebpageDto;
  buildLayout(): WebpageDtoBuilder;
  buildPage(): WebpageDtoBuilder;
}

export class WebpageDtoBuilder implements IWebpageDtoBuilder {
  webpageDto: WebpageDto;

  constructor(
    public website: Website,
    public layout: WebPage,
    public webpage: WebPage,
  ) {
    this.webpageDto = new WebpageDto();
  }

  getDto(): WebpageDto {
    return this.webpageDto;
  }

  buildLayout(): WebpageDtoBuilder {
    this.webpageDto.layout = {
      variant: this.layout.pageVariant,
      handle: this.website.handle,
    };
    return this;
  }

  buildPage(): WebpageDtoBuilder {
    this.webpageDto.page = {
      slug: this.webpage.slug,
      title: this.webpage.title,
      type: this.webpage.pageType,
      variant: this.webpage.pageVariant,
    };

    return this;
  }
}
