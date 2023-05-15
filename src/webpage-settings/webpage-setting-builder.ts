import { WebpageSetting } from './entities/webpage-setting.entity';

interface ISettingBuilder {
  create: () => Promise<ISettingBuilder>;
  getSetting: () => Promise<WebpageSetting>;
  withWebpageId: (webpageId: string) => Promise<ISettingBuilder>;
  withValue: (key: string, value: object) => Promise<ISettingBuilder>;
}

export class WebPageSettingBuilder implements ISettingBuilder {
  private setting: WebpageSetting;

  async create() {
    this.setting = new WebpageSetting();
    return this;
  }

  async getSetting() {
    return this.setting;
  }

  async withWebpageId(webpageId: string) {
    this.setting.webpageId = webpageId;
    return this;
  }

  async withValue(key: string, value: any) {
    this.setting.key = key;
    this.setting.setValue(value);
    return this;
  }
}
