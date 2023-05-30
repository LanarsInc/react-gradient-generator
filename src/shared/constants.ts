export enum GradientTypes {
  LINEAR = 'linear',
  RADIAL = 'radial',
}

export enum ThemeMode {
  DARK = 'dark',
  LIGHT = 'light',
}

export const messageLifeTime = 3000;
export const themeModeLocalStorageKey = 'gradient-generator-theme-mode';
export const maxColorsCount = 9;
export const hexColorRegExp = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
export const defaultGradient =
  'linear-gradient(180deg, rgba(242, 178, 56, 1) 0%, rgba(240, 103, 25, 1) 100%)';
