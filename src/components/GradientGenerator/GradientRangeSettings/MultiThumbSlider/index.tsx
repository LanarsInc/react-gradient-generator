import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';
import { hexToRgbaObject, removeAlphaFromRgbaColor } from '@shared/utils';
import { defaultHexColor, maxColorsCount } from '@shared/constants';
import { Palette } from '@shared/types/interfaces';

import './MultiThumbSlider.scss';

interface MultiThumbSliderProps {
  palettes: Palette[];
  activePaletteId: string | undefined;
  setPalettes: (palettes: Palette[]) => void;
  setActivePalette: (palette: Palette) => void;
}

const MultiThumbSlider: React.FC<MultiThumbSliderProps> = ({
  palettes,
  activePaletteId,
  setPalettes,
  setActivePalette,
}) => {
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);

  const handleColorPositionChange = (value: string, paletteId: string) => {
    const newPalettes = [...palettes];
    const neededPalette = newPalettes.find(
      (palette) => palette.id === paletteId
    );

    if (neededPalette) {
      neededPalette.position = parseInt(value, 10);
      setPalettes(newPalettes);
    }
  };

  const handleAddNewColor = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === sliderContainerRef.current) {
      const mousePosition = event.nativeEvent.offsetX;
      const positionForInput = Math.round(
        (mousePosition * 100) / Number(sliderContainerRef.current?.offsetWidth)
      );
      const { red, green, blue, alpha } = hexToRgbaObject(defaultHexColor);

      const newPalette = {
        id: uuidv4(),
        color: `rgba(${red}, ${green}, ${blue}, ${alpha})`,
        position: positionForInput,
      };

      setActivePalette(newPalette);
      setPalettes([...palettes, newPalette]);
    }
  };

  return (
    <div
      ref={sliderContainerRef}
      className={classnames('multi-thumb-slider', {
        limit: palettes.length >= maxColorsCount,
      })}
      onClick={handleAddNewColor}
    >
      {palettes.map((palette) => (
        <input
          key={palette.id}
          aria-label="color-position"
          className={classnames('multi-thumb-slider__input', {
            active: activePaletteId === palette.id,
          })}
          style={{
            ['--gradient-thumb-color' as string]: removeAlphaFromRgbaColor(
              palette.color
            ),
          }}
          type="range"
          min="0"
          max="100"
          step="1"
          value={palette.position}
          onClick={() => setActivePalette(palette)}
          onChange={(event) =>
            handleColorPositionChange(event.target.value, palette.id)
          }
        />
      ))}
    </div>
  );
};

export default MultiThumbSlider;
