import { Injectable } from '@nestjs/common';
import { WebpageSetting } from './entities/webpage-setting.entity';
import { WebPageSettingBuilder } from './webpage-setting-builder';
import { PageTypes } from 'src/webpages/types';
import SettingKeys from './setting-keys';

@Injectable()
export class WebpageSettingsService {
  async getWebpageDefaultSettings(type: PageTypes): Promise<WebpageSetting[]> {
    if (type === PageTypes.LAYOUT) return this.getLayoutDefaultSettings();
    return [];
  }

  private async getLayoutDefaultSettings(): Promise<WebpageSetting[]> {
    return Promise.all([
      new WebPageSettingBuilder()
        .create()
        .then((builder) => builder.withValue(SettingKeys.DIR, 'ltr'))
        .then((builder) => builder.getSetting()),
      new WebPageSettingBuilder()
        .create()
        .then((builder) =>
          builder.withValue(SettingKeys.GOOGLE_ADSENSE_KEY, {
            test: 'laskdfalsdfjalsdkfjasd', // TODO: should be from user or liiinx account :D
          }),
        )
        .then((builder) => builder.getSetting()),
    ]);
  }
}
