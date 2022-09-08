import { Palette } from './types/interfaces';
import { KeyNumberValue } from './types';

type SplitGradientStringReturnValue = [string, string, Omit<Palette, 'id'>[]];

export const splitGradientString = (gradientString: string): SplitGradientStringReturnValue => {
  const regex = new RegExp(/,(?![^(]*\))(?![^"']*["'](?:[^"']*["'][^"']*["'])*[^"']*$)/, 'gi');
  const gradientType = gradientString.substring(0, gradientString.indexOf('(')).split('-')[0];
  const secondPartOfGradient = gradientString.substring(gradientString.indexOf('(') + 1, gradientString.lastIndexOf(')')).split(regex);
  let gradientAnglePoint = secondPartOfGradient[0];
  const isDefaultAngle = !gradientAnglePoint.includes('rgb');

  if (!isDefaultAngle) {
    gradientAnglePoint = '180deg';
  }

  const gradientPalettes = secondPartOfGradient.slice(Number(isDefaultAngle)).map((palette) => {
    const color = palette.substring(0, palette.indexOf(')') + 1).trim();
    const position = parseInt(palette.substring(palette.indexOf(')') + 1, palette.length - 1).trim());

    return ({
      color,
      position,
    });
  });

  return [gradientType, gradientAnglePoint, gradientPalettes];
};

export const hex2rgb = (hex: string): KeyNumberValue => {
  const validHEXInput = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!validHEXInput) {
    return {
      red: 255,
      green: 255,
      blue: 255,
      alpha: 1,
    };
  }

  return {
    red: parseInt(validHEXInput[1], 16),
    green: parseInt(validHEXInput[2], 16),
    blue: parseInt(validHEXInput[3], 16),
    alpha: 1,
  };
};

export const rgb2hex = (color: string | undefined): string => {
  if (color) {
    const isAlpha = color.includes('a');
    const rgbPoints = color.substring(isAlpha ? 5 : 4, color.length - 1).replace(/ /g, '')
      .split(',');

    const hexArray = rgbPoints.map((point) => {
      const hexPoint = Number(point).toString(16);

      if (hexPoint.length === 1) {
        return `0${hexPoint}`;
      }
      return hexPoint;
    });

    return isAlpha ? `#${hexArray.slice(0, -1).join('')}` : `#${hexArray.join('')}`;
  }
  return '#000000';
};

export const allowOnlyNumbers = (event: KeyboardEvent): void => {
  if (!/^(\d|.{2,})$/.test(event.key)) {
    event.preventDefault();
  }
};
