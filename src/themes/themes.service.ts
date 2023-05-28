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
      bodyBgColor: 'red',
      headerHeight: '400px',
      mainBorderColor: 'pink',
      primaryTextColor: 'red',
      profileImageBorderColor: 'yellow',
      profileImageBorderWidth: '10',
      secondaryTextColor: 'aqua',
    };

    return lodash.merge(defaultSettings, layoutOverrides, pageOverrides);
  }
}
