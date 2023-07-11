interface BlockThemeDto {
  style?: object;
  className?: string;
}

interface BlockWithWrapperThemeDto extends BlockThemeDto {
  wrapper?: BlockThemeDto;
}

export interface ThemeDto {
  code?: string;

  body: BlockThemeDto;
  header: BlockWithWrapperThemeDto;
  content: BlockWithWrapperThemeDto;
  footer: BlockWithWrapperThemeDto;

  typography: {
    logo: BlockThemeDto;
    primaryAccentText: BlockThemeDto;
    primaryText: BlockThemeDto;
    primaryDarkText: BlockThemeDto;
    primaryDarkAccentText: BlockThemeDto;
    secondaryText: BlockThemeDto;
    secondaryDarkText: BlockThemeDto;
  };
}
