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
        style: {
          backgroundColor: '#424242',
        },
      },

      content: {
        style: {
          backgroundColor: 'white',
        },
        wrapper: {
          style: {
            backgroundColor: '#EEEEEE',
          },
        },
      },
      header: {
        wrapper: {
          style: {
            backgroundColor: 'white',
          },
        },
      },
      footer: {
        style: {
          backgroundColor: '#fff',
        },
        wrapper: {
          style: {
            backgroundColor: '#424242',
          },
        },
      },
      typography: {
        logo: {
          style: { color: 'purple' },
        },
        primaryAccentText: {
          style: { color: 'purple' },
        },
        primaryDarkAccentText: {
          style: {
            color: 'yellow',
          },
        },
        primaryText: {
          style: {
            color: '#222',
          },
        },
        secondaryText: {
          style: {
            color: 'pink',
          },
        },
        primaryDarkText: {
          style: {
            color: 'blue',
          },
        },
        secondaryDarkText: {
          style: {
            color: 'green',
          },
        },
      },
    };

    return lodash.merge(defaultSettings, layoutOverrides, pageOverrides);
  }
}
