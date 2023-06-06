import { Injectable } from '@nestjs/common';
import { WebpageSetting } from './entities/webpage-setting.entity';
import { WebPageSettingBuilder } from './setting-builder';
import SettingKeys from './setting-keys';

@Injectable()
export class SettingService {
  // private mapToPageSettingsDto(settings: WebpageSetting[]): PageSettingsDto {
  //   return settings.reduce((result, item) => {
  //     result[item.key] = item.getValue();
  //     return result;
  //   }, {}) as PageSettingsDto;
  // }

  private async getLayoutDynamicSettings(): Promise<WebpageSetting[]> {
    return [];
  }

  async getDefaultLayoutSettings(): Promise<WebpageSetting[]> {
    return Promise.all([
      new WebPageSettingBuilder()
        .create()
        .then((builder) =>
          builder.withValue(SettingKeys.FAVICON_URL, 'favicon.png'),
        )
        .then((builder) => builder.getSetting()),
      new WebPageSettingBuilder()
        .create()
        .then((builder) => builder.withValue(SettingKeys.DIR, 'ltr')) // can be dynamic and removed
        .then((builder) => builder.getSetting()),
      new WebPageSettingBuilder()
        .create()
        .then((builder) =>
          builder.withValue(
            SettingKeys.GOOGLE_ADSENSE_KEY,
            'OUR_GOOGLE_ID', // TODO: should be from user or liiinx account :D
          ),
        )
        .then((builder) => builder.getSetting()),
    ]);
  }
}
