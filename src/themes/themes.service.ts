import { Injectable } from '@nestjs/common';
import { ThemeDto } from './dto/theme.dto';
import { lodash } from 'src/utils';

@Injectable()
export class ThemeService {
  async getThemeByCode(
    code = 'heem',
    layoutThemeOverrides: Partial<ThemeDto>,
    pageThemeOverrides: Partial<ThemeDto>,
  ): Promise<ThemeDto> {
    const theme = this.generateTheme(layoutThemeOverrides, pageThemeOverrides);
    theme.code = code;
    return theme;
  }

  private generateTheme(
    layoutOverrides: Partial<ThemeDto>,
    pageOverrides: Partial<ThemeDto>,
  ): ThemeDto {
    const defaultSettings: ThemeDto = {
      body: {
        bgColor: '#9E9E9E',
      },
      header: {
        bgColor: 'red',
      },
      primaryTextColor: 'red',
      secondaryTextColor: 'aqua',
    };

    return lodash.merge(defaultSettings, layoutOverrides, pageOverrides);
  }
}
