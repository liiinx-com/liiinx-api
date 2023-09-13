export enum PageType {
  LAYOUT = 'LAYOUT',
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  BIO = 'BIO',
}

export const getPaySlugByType = (type: PageType) => type.toLowerCase();
