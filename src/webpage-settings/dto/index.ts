interface Element {
  className?: string;
  style?: object;
  contained: boolean;
}

interface LayoutSection extends Element {
  wrapper: Element;
  isActive: boolean;
}

export interface PageSettingsDto {
  dir: 'ltr' | 'rtl';
  faviconUrl: string;
  topBar?: LayoutSection;
  header?: LayoutSection;
  hero?: LayoutSection;
  sidebar?: LayoutSection;
  content?: LayoutSection;
  footer?: LayoutSection;
  footerBar?: LayoutSection;
}

export interface PageSettingsDto2 {
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
