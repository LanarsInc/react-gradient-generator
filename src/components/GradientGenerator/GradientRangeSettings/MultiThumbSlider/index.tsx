import React, { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';
import variables from '../../../../styles/abstracts/variables.scss';
import { rgb2hex } from '../../../../shared/utils';
import { IPalette } from '../../../../shared/types/interfaces';

import './MultiThumbSlider.scss';

interface MultiThumbSliderProps {
  maxColorsCount: number;
  palettes: IPalette[];
  activePalette: IPalette;
  setPalettes: (func: (palettes: IPalette[]) => void) => void;
  setActivePalette: (palette: IPalette) => void;
}

const MultiThumbSlider:React.FC<MultiThumbSliderProps> = ({
  maxColorsCount,
  palettes,
  activePalette,
  setPalettes,
  setActivePalette,
}) => {

  const sliderContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sliders = sliderContainerRef.current.querySelectorAll('.multi-thumb-slider__input');

    sliders.forEach((slider) => {
      slider.oninput = handleRangeChange;
    });
  }, [palettes]);

  const handleRangeChange = () => {
    const sliders = sliderContainerRef.current.querySelectorAll('.multi-thumb-slider__input');

    const newPalettesArray = Array.from(sliders)
      .map((element) => ({
        id: element.dataset.id,
        position: element.value,
        color: element.dataset.color,
      }));

    setPalettes(newPalettesArray);
  };

  const handleAddNewSlider = (e) => {
    const mousePosition = e.nativeEvent.offsetX;
    const positionForInput = Math.round(mousePosition * 100 / variables.gradientPreviewWidth);

    if (e.target === sliderContainerRef.current) {
      setPalettes((prevState: IPalette[]) => ([
        ...prevState,
        {id: uuidv4(), color: 'rgba(0, 0, 0, 1)', position: positionForInput},
      ]));
    }
  };

  return (
    <div
      ref={sliderContainerRef}
      className={classnames('multi-thumb-slider', {
        'limit': palettes.length >= maxColorsCount,
      })}
      onClick={handleAddNewSlider}
    >
      {palettes.map((palette) =>
        <input
          key={palette.id}
          className={classnames('multi-thumb-slider__input', {
            'active': activePalette?.id === palette.id,
          })}
          style={{'--gradient-thumb-color': rgb2hex(palette.color)}}
          onClick={() => setActivePalette(palette)}
          data-color={palette.color}
          data-id={palette.id}
          value={palette.position}
          readOnly
          min='0'
          max='100'
          step='1'
          type='range'
        />
      )}
    </div>
  );
};

export default MultiThumbSlider;