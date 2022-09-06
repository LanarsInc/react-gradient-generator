import React from 'react';
import MultiThumbSlider from './MultiThumbSlider';
// @ts-ignore
import { ReactComponent as SwapIcon } from './../../../assets/svg/ic_swap.svg';
import { IPalette } from '../../../shared/types/interfaces';

import './GradientSlider.scss';

interface GradientRangeSettingsProps {
    gradient: string;
    maxColorsCount: number;
    palettes: IPalette[];
    activePalette: IPalette;
    setPalettes: (func: (palettes: IPalette[]) => void) => void;
    setActivePalette: (palette: IPalette) => void;
    handleSwapColors: () => void;
}

const GradientRangeSettings:React.FC<GradientRangeSettingsProps> = ({
  gradient,
  maxColorsCount,
  palettes,
  activePalette,
  setPalettes,
  setActivePalette,
  handleSwapColors,
}) => (
  <div className="gradient-range-settings">
    <div
      className="gradient-range-settings__slider-container"
      style={{ background: gradient }}
    >
      <MultiThumbSlider
        maxColorsCount={ maxColorsCount }
        palettes={ palettes }
        activePalette={ activePalette }
        setPalettes={ setPalettes }
        setActivePalette={ setActivePalette } />
    </div>

    <button
      className="gradient-range-settings__swap-btn"
      onClick={ handleSwapColors }
    >
      <SwapIcon />
    </button>
  </div>
);

export default GradientRangeSettings;
