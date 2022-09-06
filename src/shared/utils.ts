import { IPalette } from './types/interfaces';
import { KeyNumberValue } from './types';

type splitGradientStringReturnValue = [string, string, Partial<IPalette>[]];

export const splitGradientString = (gradientString: string): splitGradientStringReturnValue => {
  const regex = new RegExp(/,(?![^(]*\))(?![^"']*["'](?:[^"']*["'][^"']*["'])*[^"']*$)/,'gi');
  const gradientType = gradientString.substring(0, gradientString.indexOf('(')).split('-')[0];
  const secondPartOfGradient = gradientString.substring(gradientString.indexOf('(') + 1, gradientString.lastIndexOf(')')).split(regex);
  let gradientAnglePoint = secondPartOfGradient[0];
  const isDefaultAngle = !gradientAnglePoint.includes('rgb');

  if (!isDefaultAngle) {
    gradientAnglePoint = '180deg';
  }

  const gradientPalettes = secondPartOfGradient.slice(Number(isDefaultAngle)).map((palette) => {
    const color = palette.substring(0, palette.indexOf(')') + 1).trim();
    const position = palette.substring(palette.indexOf(')') + 1, palette.length - 1).trim();

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
    return { r: 255, g: 255, b: 255, a: 1};
  }

  return {
    r: parseInt(validHEXInput[1], 16),
    g: parseInt(validHEXInput[2], 16),
    b: parseInt(validHEXInput[3], 16),
    a: 1,
  };
};

export const rgb2hex = (color: string | undefined): string => {
  if (color) {
    const isAlpha = color.includes('a');
    const rgbPoints = color.substring(isAlpha ? 5 : 4, color.length - 1).replace(/ /g, '').split(',');

    const hexArray = rgbPoints.map((point) => {
      const hexPoint = Number(point).toString(16);

      if (hexPoint.length === 1) {
        return '0' + hexPoint;
      } else {
        return hexPoint;
      }
    });

    return isAlpha ? `#${hexArray.slice(0, -1).join('')}` : `#${hexArray.join('')}`;
  } else {
    return '#000000';
  }
};

export const allowOnlyNumbers = (event: KeyboardEvent) => {
  if (!/^(\d|.{2,})$/.test(event.key)) {
    event.preventDefault();
  }
};