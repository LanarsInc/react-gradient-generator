import React from 'react';
import { hexColorRegExp, defaultHexColor } from './constants';
import { Palette } from './types/interfaces';
import { KeyNumberValue } from './types/general';

type SplitGradientStringReturnValue = [string, string, Omit<Palette, 'id'>[]];

export const splitGradientString = (
  gradientString: string
): SplitGradientStringReturnValue => {
  const regex = /,(?![^(]*\))(?![^"']*["'](?:[^"']*["'][^"']*["'])*[^"']*$)/gi;
  const gradientType = gradientString
    .substring(0, gradientString.indexOf('('))
    .split('-')[0];
  const secondPartOfGradient = gradientString
    .substring(gradientString.indexOf('(') + 1, gradientString.lastIndexOf(')'))
    .split(regex);
  let gradientAnglePoint = secondPartOfGradient[0];
  const isDefaultAngle = !gradientAnglePoint.includes('rgb');

  if (!isDefaultAngle) {
    gradientAnglePoint = '180deg';
  }

  const gradientPalettes = secondPartOfGradient
    .slice(Number(isDefaultAngle))
    .map((palette) => {
      const color = palette.substring(0, palette.indexOf(')') + 1).trim();
      const position = parseInt(
        palette.substring(palette.indexOf(')') + 1, palette.length - 1).trim(),
        10
      );

      return {
        color,
        position,
      };
    });

  return [gradientType, gradientAnglePoint, gradientPalettes];
};

export const hexToRgbaObject = (hexColor: string): KeyNumberValue => {
  const validHexColor = hexColorRegExp.exec(hexColor);

  if (!validHexColor) {
    return hexToRgbaObject(defaultHexColor);
  }

  return {
    red: parseInt(validHexColor[1], 16),
    green: parseInt(validHexColor[2], 16),
    blue: parseInt(validHexColor[3], 16),
    alpha: validHexColor[4]
      ? Math.round((parseInt(validHexColor[4], 16) / 255) * 100) / 100
      : 1,
  };
};

export const rgbaToHex = (rgbaColor: string): string => {
  const rgbaPoints = rgbaColor
    .substring(5, rgbaColor.length - 1)
    .replace(/ /g, '')
    .split(',');

  const hexPoints = rgbaPoints.map((rgbaPoint, index) => {
    let hexPoint;

    if (index === rgbaPoints.length - 1) {
      hexPoint = Math.round(Number(rgbaPoint) * 255).toString(16);
    } else {
      hexPoint = Number(rgbaPoint).toString(16);
    }

    return hexPoint.length === 1 ? `0${hexPoint}` : hexPoint;
  });

  return `#${hexPoints.join('')}`;
};

export const removeAlphaFromRgbaColor = (rgbaColor: string): string => {
  const rgbPoints = rgbaColor
    .substring(5, rgbaColor.length - 1)
    .replace(/ /g, '')
    .split(',');

  return `rgb(${rgbPoints[0]}, ${rgbPoints[1]}, ${rgbPoints[2]})`;
};

export const allowOnlyNumbers = (
  event: React.KeyboardEvent<HTMLInputElement>
): void => {
  if (!/^(\d|.{2,})$/.test(event.key)) {
    event.preventDefault();
  }
};
