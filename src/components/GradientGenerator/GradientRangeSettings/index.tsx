import React from 'react';
import MultiThumbSlider from './MultiThumbSlider';
import { ReactComponent as SwapIcon } from '../../../assets/svg/ic_swap.svg';
import { Palette } from '../../../shared/types/interfaces';

import './GradientSlider.scss';

interface GradientRangeSettingsProps {
  gradient: string;
  maxColorsCount: number;
  palettes: Palette[];
  activePalette: Palette | null;
  setPalettes: (palettes: Palette[]) => void;
  setActivePalette: (palette: Palette) => void;
  handleSwapColors: () => void;
}

const GradientRangeSettings: React.FC<GradientRangeSettingsProps> = ({
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
        maxColorsCount={maxColorsCount}
        palettes={palettes}
        activePalette={activePalette}
        setPalettes={setPalettes}
        setActivePalette={setActivePalette}
      />
    </div>

    <button
      type="button"
      className="gradient-range-settings__swap-btn"
      onClick={handleSwapColors}
    >
      <SwapIcon />
    </button>
  </div>
);

export default GradientRangeSettings;
