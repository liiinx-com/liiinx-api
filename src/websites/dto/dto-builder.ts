import { Webpage } from 'src/webpages/entities/webpage.entity';
import { Website } from '../entities/website.entity';
import { WebpageDto } from './webpage.dto';

interface IWebpageDtoBuilder {
  create: () => WebpageDtoBuilder;
  getDto: () => WebpageDto;
  buildLayout: () => WebpageDtoBuilder;
  buildPage: () => WebpageDtoBuilder;
}

export class WebpageDtoBuilder implements IWebpageDtoBuilder {
  webpageDto: WebpageDto;

  constructor(
    public website: Website,
    public layout: Webpage,
    public webpage: Webpage,
  ) {}

  create() {
    this.webpageDto = new WebpageDto();
    return this;
  }

  getDto(): WebpageDto {
    return this.webpageDto;
  }

  // TODO: clean the arch and design
  buildLayout(): WebpageDtoBuilder {
    const menus = this.layout.menus.reduce((result, item) => {
      result[item.menuType] = item;
      return result;
    }, {});

    this.webpageDto.layout = {
      variant: this.layout.pageVariant,
      handle: this.website.handle,
      ...(menus['HEADER_PRIMARY']
        ? { headerPrimaryMenu: menus['HEADER_PRIMARY'] }
        : {}),
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
