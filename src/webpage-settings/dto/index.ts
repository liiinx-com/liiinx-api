export interface PageSettingsDto {
  dir: 'ltr' | 'rtl';
  faviconUrl: string;
  topBar?: { isActive: boolean };
  sidebar?: { isActive: boolean };
  header?: { isActive: boolean };
  footer?: { isActive: boolean };
  main?: {
    leftBar?: { isActive: boolean };
    rightBar?: { isActive: boolean };
  };
}
