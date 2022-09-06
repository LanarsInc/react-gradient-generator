import React from 'react';
import classnames from 'classnames';
import { ReactComponent as CloseIcon } from './../../../assets/svg/ic-close.svg';
import { IPalette } from '../../../shared/types/interfaces';

import './GradientPreview.scss';

interface GradientPreviewProps {
    palettes: IPalette[];
    activePaletteId: string;
    gradient: string;
    setActivePalette: (palette: IPalette) => void;
    handleDeletePalette: (paletteId: string) => void;
}

const GradientPreview:React.FC<GradientPreviewProps> = ({
  palettes,
  activePaletteId,
  gradient,
  setActivePalette,
  handleDeletePalette,
}) => {
  return (
    <div className='gradient-preview'>

      <div className='gradient-preview__panel'>
        {palettes
          .sort((paletteA, paletteB) => paletteA.position - paletteB.position)
          .map((pallet) => (
            <div
              key={pallet.id}
              className={classnames('gradient-preview-pallet', {
                'active': pallet.id === activePaletteId,
              })}
              onClick={() => setActivePalette(pallet)}
            >
              <div
                className='gradient-preview-pallet__inner'
                style={{ background: pallet.color }}
              />
              <div
                className={classnames('gradient-preview-pallet__delete-btn', {
                  'canDelete': palettes.length > 2,
                })}
                onClick={() => handleDeletePalette(pallet.id)}
              >
                <CloseIcon />
              </div>
            </div>
        ))}
      </div>

      <div className='gradient-preview__gradient-container'>
        <div
          className='gradient-preview__gradient'
          style={{ background: gradient }}
        />
      </div>
    </div>
  );
};

export default GradientPreview;
