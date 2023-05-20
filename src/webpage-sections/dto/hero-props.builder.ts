import { HeroProps } from '.';

export type MediaType = 'video' | 'image';

export class HeroItem {
  title?: string;
  subTitle?: string;
  mediaUrl?: string;
  mediaType?: MediaType;
}

export class HeroPropsBuilder {
  props: HeroProps;
  create() {
    this.props = new HeroProps();
    return this;
  }

  withItem(item: HeroItem) {
    this.props.items.push(item);
    return this;
  }

  getProps(): HeroProps {
    return this.props;
  }
}

export class HeroItemBuilder {
  item: HeroItem;

  create(): HeroItemBuilder {
    this.item = new HeroItem();
    return this;
  }

  withTitle(title: string): HeroItemBuilder {
    this.item.title = title;
    return this;
  }

  withSubTitle(subTitle: string): HeroItemBuilder {
    this.item.subTitle = subTitle;
    return this;
  }

  withMedia(mediaType: MediaType, mediaUrl: string): HeroItemBuilder {
    this.item.mediaType = mediaType;
    this.item.mediaUrl = mediaUrl;
    return this;
  }

  getItem(): HeroItem {
    return this.item;
  }
}
