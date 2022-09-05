import React from 'react';
import classnames from 'classnames';
import { ReactComponent as CloseIcon } from './../../../assets/svg/ic-close.svg';

import './GradientPreview.scss';


const GradientPreview = ({
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
              style={{ background: pallet.color }}
              onClick={() => setActivePalette(pallet)}
            >
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
