import { Injectable } from '@nestjs/common';
import { ThemeDto } from './dto/theme.dto';
import { ThemeDtoBuilder } from './theme.dto-builder';

@Injectable()
export class ThemeService {
  constructor(private readonly themeDtoBuilder: ThemeDtoBuilder) {}

  async getThemeByCode(code = 'heem'): Promise<ThemeDto> {
    return this.themeDtoBuilder
      .create(code)
      .then((builder) => builder.getTheme());
  }
}
