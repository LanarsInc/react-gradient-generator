export enum GradientTypes {
  LINEAR = 'linear',
  RADIAL = 'radial',
}

export enum ThemeMode {
  DARK = 'dark',
  LIGHT = 'light',
}

export const themeModeLocalStorageKey = 'gradient-generator-theme-mode';
export const maxColorsCount = 9;
export const defaultGradient =
  'linear-gradient(180deg, rgba(242, 178, 56, 1) 0%, rgba(240, 103, 25, 1) 100%)';
