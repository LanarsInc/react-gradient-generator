import React, { useEffect, useState, useRef } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { HexColorPicker as Picker } from 'react-colorful';
import { allowOnlyNumbers, hex2rgb, rgb2hex } from '../../../shared/utils';
import { KeyNumberValue } from '../../../shared/types';
import { useOutsideClick } from '../../../shared/hooks/useOutsideClick';
import { Palette } from '../../../shared/types/interfaces';
import useWindowSize from '../../../shared/hooks/useWindowSize';
import { defaultHexColor, hexColorRegExp } from '../../../shared/constants';
import variables from '../../../styles/abstracts/variables.scss';

import { ReactComponent as TrashIcon } from '../../../assets/svg/trash.svg';

import './GradientActivePalette.scss';

interface GradientActivePaletteProps {
  activePalette: Palette;
  canDeletePalette: boolean;
  handleGradientColorChange: (color: string, isRGB?: boolean) => void;
  handleDeletePalette: (paletteId: string) => void;
}

const GradientActivePalette: React.FC<GradientActivePaletteProps> = ({
  activePalette,
  canDeletePalette,
  handleGradientColorChange,
  handleDeletePalette,
}) => {
  const { width } = useWindowSize();
  const isChangeSettingWidth =
    width > parseInt(variables.smallBreakPoint, 10) && !canDeletePalette;

  const [isShowColorPicker, setIsShowColorPicker] = useState<boolean>(false);
  const [hexColor, setHexColor] = useState<string>(defaultHexColor);
  const [rgbObject, setRgbObject] = useState<KeyNumberValue>({
    red: 255,
    green: 255,
    blue: 255,
    alpha: 1,
  });
  const [colorOpacity, setColorOpacity] = useState<number>(100);
  const [colorOpacityInput, setColorOpacityInput] = useState<string>('100%');

  const previewRef = useRef<HTMLDivElement>(null);
  const pickerWrapperRef = useOutsideClick(
    () => setIsShowColorPicker(false),
    previewRef?.current
  );

  useEffect(() => {
    const colorInHex = rgb2hex(activePalette.color);
    const colorInRGB = hex2rgb(colorInHex);
    const alpha = parseFloat(activePalette.color.split(',')[3] as string);
    const opacity = Math.round(alpha * 100);

    setHexColor(colorInHex);
    setRgbObject(colorInRGB);
    setColorOpacity(opacity);
    setColorOpacityInput(`${opacity}%`);
  }, [activePalette.color]);

  const handleBlurColorInput = (color: string) => {
    if (hexColorRegExp.test(color)) {
      handleGradientColorChange(hexColor);
    } else {
      setHexColor(defaultHexColor);
      handleGradientColorChange(defaultHexColor);
    }
  };

  const handleKeyDownColorInput = (event) => {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  };

  const handleChangeColorOpacity = (value: string) => {
    const { red, green, blue } = rgbObject;
    let opacity = !value ? 0 : parseInt(value, 10);

    if (opacity > 100) {
      opacity = 100;
    }

    setColorOpacity(opacity);
    setColorOpacityInput(`${opacity}%`);
    handleGradientColorChange(
      `rgba(${red}, ${green}, ${blue}, ${opacity / 100})`,
      true
    );
  };

  const handleKeyDownColorOpacityInput = (event) => {
    if (event.keyCode === 13) {
      event.target.blur();
    }

    allowOnlyNumbers(event);
  };

  const { red, green, blue } = rgbObject;

  return (
    <section className="gradient-active-color">
      <h2 className="gradient-generator__subheader">Color</h2>

      <div className="gradient-active-color__content">
        <div
          ref={previewRef}
          className="gradient-active-color__preview"
          style={{ backgroundColor: hexColor }}
          onClick={() => setIsShowColorPicker((prevState) => !prevState)}
        />

        {isShowColorPicker && (
          <div
            ref={pickerWrapperRef}
            className="gradient-active-color__picker-wrapper"
          >
            <Picker
              color={hexColor}
              onChange={(valueInHex) => handleGradientColorChange(valueInHex)}
            />
          </div>
        )}

        <m.div
          initial={isChangeSettingWidth ? { width: 327 } : { width: 'auto' }}
          animate={isChangeSettingWidth ? { width: 383 } : { width: 'auto' }}
          transition={{
            duration: 0.7,
            ease: 'easeInOut',
          }}
          className="gradient-active-color__settings"
        >
          <div className="gradient-active-color__inputs-container">
            <input
              aria-label="color-value"
              className="gradient-active-color__input"
              placeholder="Color"
              value={hexColor}
              onChange={(event) => setHexColor(event.target.value)}
              onBlur={(event) => handleBlurColorInput(event.target.value)}
              onKeyDown={handleKeyDownColorInput}
            />

            <input
              aria-label="color-opacity"
              className="gradient-active-color__input"
              value={colorOpacityInput}
              onChange={(event) => setColorOpacityInput(event.target.value)}
              onBlur={(event) => handleChangeColorOpacity(event.target.value)}
              onKeyDown={handleKeyDownColorOpacityInput}
            />
          </div>

          <m.div className="gradient-active-color__slider-container">
            <input
              aria-label="color-opacity"
              className="gradient-active-color__slider"
              style={{
                ['--slider-thumb-color' as string]: hexColor,
                background: `linear-gradient(to right, rgba(${red}, ${green}, ${blue}, 0), rgba(${red}, ${green}, ${blue}, 1))`,
              }}
              type="range"
              min="0"
              max="100"
              step="1"
              value={colorOpacity}
              onChange={(event) => handleChangeColorOpacity(event.target.value)}
            />
          </m.div>
        </m.div>
        <AnimatePresence>
          {canDeletePalette && (
            <m.button
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 360] }}
              exit={{ scale: 0, rotate: [0, 360] }}
              transition={{
                duration: 0.7,
                ease: 'easeInOut',
              }}
              type="button"
              aria-label="delete"
              className="gradient-active-color__delete-btn"
              disabled={!canDeletePalette}
              onClick={() => handleDeletePalette(activePalette.id)}
            >
              <TrashIcon className="gradient-active-color__delete-icon" />
            </m.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GradientActivePalette;
