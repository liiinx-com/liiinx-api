import { Injectable } from '@nestjs/common';
import { ThemeDto } from './dto/theme.dto';

interface IThemeDtoBuilder {
  theme: ThemeDto;
  create: (code: string) => Promise<IThemeDtoBuilder>;
  getTheme: () => Promise<ThemeDto>;
}

@Injectable()
export class ThemeDtoBuilder implements IThemeDtoBuilder {
  theme: ThemeDto;

  async create(code: string) {
    this.theme = new ThemeDto();
    this.theme.code = code;
    return this;
  }

  async getTheme() {
    return this.theme;
  }
}
