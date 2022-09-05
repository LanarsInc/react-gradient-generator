import React from 'react';
import MultiThumbSlider from './MultiThumbSlider';
import { ReactComponent as SwapIcon } from './../../../assets/svg/ic_swap.svg';

import './GradientSlider.scss';


const GradientRangeSettings = ({
  gradient,
  maxColorsCount,
  palettes,
  activePalette,
  setPalettes,
  setActivePalette,
  handleSwapColors,
}) => {
  return (
    <div className='gradient-range-settings'>
      <div
        className='gradient-range-settings__slider-container'
        style={{background: gradient}}
      >
        <MultiThumbSlider
          maxColorsCount={maxColorsCount}
          palettes={palettes}
          activePalette={activePalette}
          setPalettes={setPalettes}
          setActivePalette={setActivePalette}
        />
      </div>

      <button
        className='gradient-range-settings__swap-btn'
        onClick={handleSwapColors}
      >
        <SwapIcon />
      </button>
    </div>
  );
};

export default GradientRangeSettings;
