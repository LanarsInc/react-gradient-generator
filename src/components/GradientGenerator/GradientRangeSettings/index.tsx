import React from 'react';
import { Palette } from '@shared/types/interfaces';

import SwapIcon from '@assets/svg/swap.svg?react';

import MultiThumbSlider from './MultiThumbSlider';
import './GradientSlider.scss';

interface GradientRangeSettingsProps {
  gradient: string;
  palettes: Palette[];
  activePaletteId: string | undefined;
  setPalettes: (palettes: Palette[]) => void;
  setActivePalette: (palette: Palette) => void;
}

const GradientRangeSettings: React.FC<GradientRangeSettingsProps> = ({
  gradient,
  palettes,
  activePaletteId,
  setPalettes,
  setActivePalette,
}) => {
  const handleSwapColors = () => {
    const sortedPallets = [...palettes].sort(
      (paletteA, paletteB) => paletteA.position - paletteB.position
    );
    const reversePositions = sortedPallets
      .map((palette) => palette.position)
      .reverse();
    const swappedPalettes = sortedPallets
      .map((palette, paletteIndex) => ({
        ...palette,
        position: reversePositions[paletteIndex],
      }))
      .sort((paletteA, paletteB) => paletteA.position - paletteB.position);

    setPalettes(swappedPalettes);
  };

  return (
    <section className="gradient-range-settings">
      <div
        className="gradient-range-settings__slider-container"
        style={{ background: gradient }}
      >
        <MultiThumbSlider
          palettes={palettes}
          activePaletteId={activePaletteId}
          setPalettes={setPalettes}
          setActivePalette={setActivePalette}
        />
      </div>

      <button
        type="button"
        aria-label="swap"
        className="gradient-range-settings__swap-btn"
        onClick={handleSwapColors}
      >
        <SwapIcon className="gradient-range-settings__swap-icon" />
      </button>
    </section>
  );
};

export default GradientRangeSettings;
