import React from 'react';
import classnames from 'classnames';
import { motion as m } from 'framer-motion';
import { Palette } from '@shared/types/interfaces';
import { SectionAppearAnimation } from '@shared/animation';
import { removeAlphaFromRgbaColor } from '@shared/utils';

import CloseIcon from '@assets/svg/close.svg?react';

import './GradientPreview.scss';

interface GradientPreviewProps {
  gradient: string;
  palettes: Palette[];
  activePaletteId: string | undefined;
  setActivePalette: (palette: Palette) => void;
  handleDeletePalette: (paletteId: string) => void;
}

const GradientPreview: React.FC<GradientPreviewProps> = ({
  gradient,
  palettes,
  activePaletteId,
  setActivePalette,
  handleDeletePalette,
}) => (
  <m.section
    initial={SectionAppearAnimation.initial}
    animate={SectionAppearAnimation.animate}
    transition={SectionAppearAnimation.transition(0.5)}
    className="gradient-preview"
  >
    <div className="gradient-preview__panel">
      {[...palettes]
        .sort((paletteA, paletteB) => paletteA.position - paletteB.position)
        .map((pallet) => (
          <div
            key={pallet.id}
            className={classnames('gradient-preview-pallet', {
              active: pallet.id === activePaletteId,
            })}
            onClick={() => setActivePalette(pallet)}
          >
            <div
              className="gradient-preview-pallet__inner"
              style={{
                backgroundColor: removeAlphaFromRgbaColor(pallet.color),
              }}
            />
            <div
              className={classnames('gradient-preview-pallet__delete-btn', {
                canDelete: palettes.length > 2,
              })}
              onClick={() => handleDeletePalette(pallet.id)}
            >
              <CloseIcon className="gradient-preview-pallet__delete-icon" />
            </div>
          </div>
        ))}
    </div>

    <div className="gradient-preview__gradient-container">
      <div
        className="gradient-preview__gradient"
        style={{ background: gradient }}
      />
    </div>
  </m.section>
);

export default GradientPreview;
