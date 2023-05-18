import React, { useEffect, useState, useRef } from 'react';
import { HexColorPicker as Picker } from 'react-colorful';
import { allowOnlyNumbers, hex2rgb, rgb2hex } from '../../../shared/utils';
import { KeyNumberValue } from '../../../shared/types';
import { useOutsideClick } from '../../../shared/hooks/useOutsideClick';
import { Palette } from '../../../shared/types/interfaces';

import { ReactComponent as DeleteIcon } from '../../../assets/svg/delete.svg';

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
  const [isShowColorPicker, setIsShowColorPicker] = useState<boolean>(false);
  const [hexColor, setHexColor] = useState<string>('#000000');
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

  const handleBlurColorInput = () => {
    const validHEXInput = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      hexColor
    );

    handleGradientColorChange(validHEXInput ? hexColor : '#000000');
  };

  const handleKeyDownColorInput = (event) => {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  };

  const handleChangeColorOpacity = (value) => {
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
    <div className="gradient-active-color">
      <h3 className="gradient-generator__subheader">Color</h3>

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

        <div>
          <div className="gradient-active-color__inputs-container">
            <input
              className="gradient-active-color__input"
              placeholder="Color"
              value={hexColor}
              onChange={(event) => setHexColor(event.target.value)}
              onBlur={handleBlurColorInput}
              onKeyDown={handleKeyDownColorInput}
            />

            <input
              className="gradient-active-color__input"
              value={colorOpacityInput}
              onChange={(event) => setColorOpacityInput(event.target.value)}
              onBlur={(event) => handleChangeColorOpacity(event.target.value)}
              onKeyDown={handleKeyDownColorOpacityInput}
            />
          </div>

          <div className="gradient-active-color__slider-container">
            <input
              id="myRange"
              className="gradient-active-color__slider"
              type="range"
              min="0"
              max="100"
              style={{
                ['--slider-thumb-color' as string]: hexColor,
                background: `linear-gradient(to right, rgba(${red}, ${green}, ${blue}, 0), rgba(${red}, ${green}, ${blue}, 1))`,
              }}
              value={colorOpacity}
              onChange={(event) => handleChangeColorOpacity(event.target.value)}
            />
          </div>
        </div>
        <button
          type="button"
          className="gradient-active-color__delete-btn"
          disabled={!canDeletePalette}
          onClick={() => handleDeletePalette(activePalette.id)}
        >
          <DeleteIcon className="gradient-active-color__delete-icon" />
        </button>
      </div>
    </div>
  );
};

export default GradientActivePalette;
