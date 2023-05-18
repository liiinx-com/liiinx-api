export class WebsiteConfigDto {}
export class LayoutConfigDto {}

export class PageConfigDto {
  icon: string;
  isRtl: boolean;
}

export class SectionDto {
  sectionType: string;
  sectionVariant: string;
  sectionProps?: object;

  constructor() {
    this.sectionProps = {};
  }
}

export class SeoMetadataDto {}

export class TopBarDto {}

export class HeaderDto extends SectionDto {
  constructor() {
    super();
    this.sectionType = 'HEADER';
  }
}
