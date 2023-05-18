import React from 'react';
import classnames from 'classnames';
import { Palette } from '../../../shared/types/interfaces';

import { ReactComponent as CloseIcon } from '../../../assets/svg/close.svg';

import './GradientPreview.scss';

interface GradientPreviewProps {
  palettes: Palette[];
  activePaletteId: string | undefined;
  gradient: string;
  setActivePalette: (palette: Palette) => void;
  handleDeletePalette: (paletteId: string) => void;
}

const GradientPreview: React.FC<GradientPreviewProps> = ({
  palettes,
  activePaletteId,
  gradient,
  setActivePalette,
  handleDeletePalette,
}) => (
  <div className="gradient-preview">
    <div className="gradient-preview__panel">
      {palettes
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
              style={{ backgroundColor: pallet.color }}
            />
            <div
              className={classnames('gradient-preview-pallet__delete-btn', {
                canDelete: palettes.length > 2,
              })}
              onClick={() => handleDeletePalette(pallet.id)}
            >
              <CloseIcon />
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
  </div>
);

export default GradientPreview;
