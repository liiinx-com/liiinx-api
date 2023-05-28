export class PageSettingsDto {
  dir: 'ltr' | 'rtl';
  faviconUrl: string;
  header: {
    isEnabled: boolean;
  };
}
