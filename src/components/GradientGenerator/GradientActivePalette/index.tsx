import React, { useEffect, useState } from 'react';
import {
  allowOnlyNumbers,
  hex2rgb,
  rgb2hex,
} from '../../../shared/utils';
import { ReactComponent as DeleteIcon } from './../../../assets/svg/ic_delete.svg';
import { Palette } from '../../../shared/types/interfaces';
import { KeyNumberValue } from '../../../shared/types';

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
  const [hexColor, setHexColor] = useState<string>('#000000');
  const [rgbObject, setRgbObject] = useState<KeyNumberValue>({
    red: 255, green: 255, blue: 255, alpha: 1,
  });
  const [colorOpacity, setColorOpacity] = useState<number>(100);
  const [colorOpacityInput, setColorOpacityInput] = useState<string>('100%');

  useEffect(() => {
    const colorInHex = rgb2hex(activePalette?.color);
    const colorInRGB = hex2rgb(colorInHex);
    const alpha = parseFloat(activePalette?.color.split(',')[3] as string);

    setHexColor(colorInHex);
    setRgbObject(colorInRGB);
    setColorOpacity(Math.round(alpha * 100));
    setColorOpacityInput(`${Math.round(alpha * 100)}%`);
  }, [activePalette?.color]);

  const handleChangeColorInput = (value) => {
    setHexColor(value);
  };

  const handleBlurColorInput = () => {
    const validHEXInput = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);

    if (validHEXInput) {
      handleGradientColorChange(hexColor);
    } else {
      handleGradientColorChange('#000000');
    }
  };

  const handleKeyDownColorInput = (event) => {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  };

  const handleChangeColorOpacityViaSlider = (value) => {
    const { red, green, blue } = rgbObject;

    setColorOpacity(Number(value));
    handleGradientColorChange(`rgba(${red}, ${green}, ${blue}, ${value / 100})`, true);
  };

  const handleChangeColorOpacityViaInput = (value) => {
    setColorOpacityInput(value);
  };

  const handleBlurColorOpacityInput = (value) => {
    const { red, green, blue } = rgbObject;
    let opacity = !value ? 0 : parseInt(value);

    if (opacity > 100) {
      opacity = 100;
    }

    setColorOpacityInput(`${opacity}%`);
    handleGradientColorChange(`rgba(${red}, ${green}, ${blue}, ${opacity / 100})`, true);
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
        <label
          htmlFor="palette"
          className="gradient-active-color__label"
          style={{ background: activePalette?.color }}
        >
          <input
            id="palette"
            className="gradient-active-color__picker"
            type="color"
            value={ rgb2hex(activePalette?.color) }
            onChange={ (event) => handleGradientColorChange(event.target.value) } />
        </label>

        <div>
          <div className="gradient-active-color__inputs-container">
            <input
              className="gradient-active-color__input"
              placeholder="Color"
              value={ hexColor }
              onChange={ (event) => handleChangeColorInput(event.target.value) }
              onBlur={ handleBlurColorInput }
              onKeyDown={ handleKeyDownColorInput } />

            <input
              className="gradient-active-color__input"
              value={ colorOpacityInput || '' }
              onChange={ (event) => handleChangeColorOpacityViaInput(event.target.value) }
              onBlur={ (event) => handleBlurColorOpacityInput(event.target.value) }
              onKeyDown={ handleKeyDownColorOpacityInput } />
          </div>

          <div className="gradient-active-color__slider-container">
            <input
              id="myRange"
              className="gradient-active-color__slider"
              type="range"
              min="0"
              max="100"
              style={{
                ['--slider-thumb-color' as string]: rgb2hex(activePalette?.color),
                background: `linear-gradient(to right, rgba(${red}, ${green}, ${blue}, 0), rgba(${red}, ${green}, ${blue}, 1))`,
              }}
              value={ colorOpacity }
              onChange={ (event) => handleChangeColorOpacityViaSlider(event.target.value) } />
          </div>
        </div>

        <button
          className="gradient-active-color__delete-btn"
          disabled={ !canDeletePalette }
          onClick={ () => handleDeletePalette(activePalette.id) }
        >
          <DeleteIcon className="gradient-active-color__delete-icon" />
        </button>
      </div>
    </div>
  );
};

export default GradientActivePalette;
