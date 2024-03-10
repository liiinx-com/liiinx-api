import { BaseActionPayloadDto } from 'src/webpage-blocks/dto';

export class SyncPlan {}

export class SyncPlanItem {}

// export class YoutubeChannelDetailsTo

// buildBlocksFromYoutubeChannelDetails(): WebpageBlocks[]

class WebsiteTemplateResourceItem {
  id: string;
  order: number;

  category: 'page' | 'block'; //| 'menu' | 'media' | 'data'
  type: string;
  variant: string;
  payload: BaseActionPayloadDto;

  items: WebsiteTemplateResourceItem[];
}

class WebsiteTemplate {
  constructor() {
    this.items = [];
  }
  id: string;
  title: string;
  description: string;
  order: number;
  eligiblePlans: string[];
  items: WebsiteTemplateResourceItem[];
}

const test = () => {
  const freeTemplate1 = new WebsiteTemplate();
  freeTemplate1.order = 1;
  freeTemplate1.title = 'free one page website based on youtube channel';
  freeTemplate1.eligiblePlans = ['FREE', 'PLAN1'];

  freeTemplate1.items = [getPageForTemplate()];
};

const getPageForTemplate = (): WebsiteTemplateResourceItem => {
  const result = new WebsiteTemplateResourceItem();

  result.id = '1';
  result.order = 1;
  result.category = 'page';
  result.type = 'LAYOUT';
  result.variant = 'heem1';
  result.items = [headerResource({})];

  return result;
};

const headerResource = (
  youtubeChannelDetails: any,
): WebsiteTemplateResourceItem => {
  const result = new WebsiteTemplateResourceItem();

  const channelDetailsToHeaderMappings = [
    {
      from: 'some.nested.property.in.channelDetails',
      to: 'imageLogoUrl',
    },
  ];

  result.id = '1';
  result.order = 1;
  result.category = 'block';
  result.type = 'header';
  result.variant = 'header1';
  result.payload = {
    imageLogoUrl: '',
    textLogo: '',
  };

  return result;
};

// 1.
