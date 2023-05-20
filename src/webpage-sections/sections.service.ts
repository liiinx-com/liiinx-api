import { Injectable } from '@nestjs/common';
import { WebpageSection } from './entities/webpage-section.entity';
import SectionKeys from './section-keys';
import {
  GenericSectionDto,
  HeroItemBuilder,
  HeroPropsBuilder,
  SectionProps,
} from './dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class PageSectionService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async createSection(
    sectionType: string,
    sectionVariant: string,
    sectionProps?: SectionProps,
    order = 1,
  ): Promise<WebpageSection> {
    const result = new WebpageSection();
    result.order = order;
    result.sectionType = sectionType;
    result.sectionVariant = sectionVariant;
    result.sectionProps = sectionProps;
    return result;
  }

  // when creating webpage-dto
  async addDynamicLayoutSections(): Promise<GenericSectionDto[]> {
    return [];
  }

  //when inserting new website
  async getDefaultLayoutSections(): Promise<WebpageSection[]> {
    return Promise.all([
      this.createSection(
        SectionKeys.HERO,
        'hero1',
        new HeroPropsBuilder()
          .create()
          .withItem(
            new HeroItemBuilder()
              .create()
              .withTitle('Welcome to my website')
              .withMedia(
                'image',
                'https://www.leadengine-wp.com/wp-content/uploads/sites/37/2018/02/startup1.jpg',
              )
              .getItem(),
          )
          .getProps(),
      ),
    ]);
  }

  mapToPageSectionsDto(sections: WebpageSection[]): GenericSectionDto[] {
    return this.mapper.mapArray(sections, WebpageSection, GenericSectionDto);
  }
}
