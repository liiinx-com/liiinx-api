export interface ThemeDto {
  code?: string;

  body: {
    bgColor: string;
  };
  header: {
    bgColor: string;
    height?: string;
    imageUrl?: string;
    imageStyle?: object;
  };

  primaryTextColor: string;
  secondaryTextColor: string;
}
