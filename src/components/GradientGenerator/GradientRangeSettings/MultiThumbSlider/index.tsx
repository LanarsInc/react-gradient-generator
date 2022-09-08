import React, { useCallback, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';
import variables from '../../../../styles/abstracts/variables.scss';
import { rgb2hex } from '../../../../shared/utils';
import { Palette } from '../../../../shared/types/interfaces';

import './MultiThumbSlider.scss';

interface MultiThumbSliderProps {
  maxColorsCount: number;
  palettes: Palette[];
  activePalette: Palette | null;
  setPalettes: (palettes: Palette[]) => void;
  setActivePalette: (palette: Palette) => void;
}

const MultiThumbSlider: React.FC<MultiThumbSliderProps> = ({
  maxColorsCount,
  palettes,
  activePalette,
  setPalettes,
  setActivePalette,
}) => {
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);

  const handleRangeChange = useCallback(() => {
    const sliders = sliderContainerRef.current?.querySelectorAll('.multi-thumb-slider__input');

    if (sliders) {
      const newPalettesArray = Array.from(sliders)
        .map((element: HTMLInputElement) => ({
          id: element.dataset.id ?? uuidv4(),
          position: parseInt(element.value),
          color: element.dataset.color ?? 'rgba(0, 0, 0, 1)',
        }));

      setPalettes(newPalettesArray);
    }
  }, [setPalettes]);

  useEffect(() => {
    const sliders = sliderContainerRef.current?.querySelectorAll('.multi-thumb-slider__input');

    if (sliders) {
      sliders.forEach((slider: HTMLElement) => {
        slider.oninput = handleRangeChange;
      });
    }
  }, [palettes, handleRangeChange]);

  const handleAddNewSlider = (event) => {
    const mousePosition = event.nativeEvent.offsetX;
    const positionForInput = Math.round(mousePosition * 100 / Number(variables.gradientPreviewWidth));

    if (event.target === sliderContainerRef.current) {
      setPalettes([
        ...palettes,
        {
          id: uuidv4(), color: 'rgba(0, 0, 0, 1)', position: positionForInput,
        },
      ]);
    }
  };

  return (
    <div
      ref={ sliderContainerRef }
      className={ classnames('multi-thumb-slider', { limit: palettes.length >= maxColorsCount }) }
      onClick={ handleAddNewSlider }
    >
      { palettes.map((palette) => (<input
        key={ palette.id }
        className={ classnames('multi-thumb-slider__input', { active: activePalette?.id === palette.id }) }
        style={{ ['--gradient-thumb-color' as string]: rgb2hex(palette.color) }}
        onClick={ () => setActivePalette(palette) }
        data-color={ palette.color }
        data-id={ palette.id }
        value={ palette.position }
        readOnly
        min="0"
        max="100"
        step="1"
        type="range" />)) }
    </div>
  );
};

export default MultiThumbSlider;
