interface Element {
  className?: string;
  style?: object;
  contained: boolean;
}

interface Block extends Element {
  blockType: string;
  blockVariant: string;
  blockProps: object;
}

interface LayoutBlock extends Block {
  wrapper: Element;
  isActive: boolean;
}

export interface PageSettingsDto {
  dir: 'ltr' | 'rtl';
  faviconUrl: string;
  topBar?: LayoutBlock;
  header?: LayoutBlock;
  hero?: LayoutBlock;
  sidebar?: LayoutBlock;
  content?: LayoutBlock;
  footer?: LayoutBlock;
  footerBar?: LayoutBlock;
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
