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
      bodyBgColor: '#37474F',
      headerHeight: '250px',
      primaryBgColor: '#A5D6A7',

      headerImageUrl:
        'https://media.istockphoto.com/id/1410766826/photo/full-frame-of-green-leaves-pattern-background.jpg?b=1&s=170667a&w=0&k=20&c=YRUnHUZxhaDmZ2OoLEXlZ7CmdfQwdCDnytJVSuY4BiI=',

      mainBorderColor: '#388E3C',
      primaryTextColor: 'red',
      profileImageBorderColor: '#4CAF50',
      profileImageBorderWidth: '2px',
      secondaryTextColor: 'aqua',
    };

    return lodash.merge(defaultSettings, layoutOverrides, pageOverrides);
  }
}
