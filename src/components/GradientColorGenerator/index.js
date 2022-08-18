import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MultiThumbSlider from './MultiThumbSlider';
import {
  hex2rgb,
  rgb2hex,
  splitGradientString,
} from '../../utils';

import './GradientColorGenerator.scss';

const linearAnglePoints = [
  {classModifier: 'top-center', value: '0deg'},
  {classModifier: 'top-right', value: '45deg'},
  {classModifier: 'center-right', value: '90deg'},
  {classModifier: 'bottom-right', value: '135deg'},
  {classModifier: 'bottom-center', value: '180deg'},
  {classModifier: 'bottom-left', value: '225deg'},
  {classModifier: 'center-left', value: '270deg'},
  {classModifier: 'top-left', value: '315deg'},
];

const radialAnglePoints = [
  {classModifier: 'top-center', value: 'circle at 0% center'},
  {classModifier: 'top-right', value: 'circle at 12.5% center'},
  {classModifier: 'center-right', value: 'circle at 25% center'},
  {classModifier: 'bottom-right', value: 'circle at 37.5% center'},
  {classModifier: 'bottom-center', value: 'circle at 50% center'},
  {classModifier: 'bottom-left', value: 'circle at 62.5% center'},
  {classModifier: 'center-left', value: 'circle at 75% center'},
  {classModifier: 'top-left', value: 'circle at 87.5% center'},
  {classModifier: 'center-center', value: 'circle'},
];


const GradientColorGenerator = ({value, handleChange, maxColorsCount}) => {

  const [palettes, setPalettes] = useState([]);
  const [focusPalette, setFocusPalette] = useState(null);
  const [gradientType, setGradientType] = useState('');
  const [anglePoints, setAnglePoints] = useState([...linearAnglePoints]);
  const [activeAnglePoint, setActiveAnglePoint] = useState('');

  useEffect(() => {
    const [gradientType, gradientAnglePoint, gradientPalettes] = splitGradientString(value);

    const newGradientPalettes = gradientPalettes.map((palette) => ({
      ...palette,
      id: uuidv4(),
    }));

    handleGradientTypeChange(gradientType, gradientAnglePoint);

    setGradientType(gradientType);
    setActiveAnglePoint(gradientAnglePoint);
    setPalettes(newGradientPalettes);
  }, []);

  useEffect(() => {
    handleCreateGradientBackground();
  }, [palettes, gradientType, activeAnglePoint]);

  const handleCreateGradientBackground = () => {
    const sortedPallets = [...palettes].sort((paletteA, paletteB) => paletteA.position - paletteB.position);
    const colorsAndPositionsString = sortedPallets.map((palette) => `${palette.color} ${palette.position}%`).join(', ');
    const result = `${gradientType}-gradient(${activeAnglePoint}, ${colorsAndPositionsString})`;

    handleChange(result);
  };

  const handleGradientColorChange = (hexColor) => {
    const rgbColor = hex2rgb(hexColor);
    const clonePalettes = [...palettes];
    const neededPalette = clonePalettes.find((palette) => palette.id === focusPalette.id);
    const { r, g, b } = rgbColor;

    neededPalette.color = `rgb(${r}, ${g}, ${b})`;

    setFocusPalette(neededPalette);
    setPalettes(clonePalettes);
  };

  const handleSwapColors = () => {
    const sortedPallets = [...palettes].sort((paletteA, paletteB) => paletteA.position - paletteB.position);
    const reversePositions = sortedPallets.map((palette) => palette.position).reverse();

    const swappedPalettes = sortedPallets.map((palette, paletteIndex) => ({
      ...palette,
      position: reversePositions[paletteIndex],
    }));

    setPalettes(swappedPalettes);
  };

  const handleDeletePalette = () => {
    setPalettes(palettes.filter((palette) => palette.id !== focusPalette.id));
    setFocusPalette(null);
  };

  const handleSliderThumbClick = (palette) => {
    setFocusPalette(palette);
  };

  const handleGradientTypeChange = (type, angle) => {
    if (!angle) {
      setGradientType(type);
    }

    if (type === 'linear') {
      setActiveAnglePoint(angle ?? '90deg');
      setAnglePoints(linearAnglePoints);
    } else {
      setActiveAnglePoint(angle ?? 'circle');
      setAnglePoints(radialAnglePoints);
    }
  };

  return (
    <div className='gradient-color-generator'>

      <div className='gradient-color-generator__top'>
        <div className='gradient-range'>
          <div
            className='gradient-range__preview'
            style={{background: value}}
          />

          <div className='gradient-range__slider-container'>
            <MultiThumbSlider
              maxColorsCount={maxColorsCount}
              palettes={palettes}
              focusPalette={focusPalette}
              setPalettes={setPalettes}
              handleSliderThumbClick={handleSliderThumbClick}
            />
          </div>
        </div>

        <div className='focus-palette'>
          {focusPalette ?
            <>
              <label
                htmlFor='head'
                className='focus-palette__preview'
                style={{background: focusPalette.color}}
              >
                <input
                  className='focus-palette__color-input'
                  type='color'
                  id='head'
                  value={rgb2hex(focusPalette.color)}
                  onInput={(event) => handleGradientColorChange(event.target?.value)}
                />
              </label>

              <Button
                variant='outlined'
                color='error'
                disabled={palettes.length <= 2 || !focusPalette}
                endIcon={<DeleteIcon />}
                onClick={handleDeletePalette}
              >
                delete
              </Button>
            </> :
            <p className='focus-palette__no-selected'>Select pallet</p>
          }
        </div>
      </div>

      <div className='gradient-color-generator__bottom'>
        <div className='gradient-type'>
          <Tooltip title='Linear' arrow>
            <div
              className={classnames('gradient-type__linear', {
                'active': gradientType === 'linear',
              })}
              onClick={() => handleGradientTypeChange('linear')}
            />
          </Tooltip>

          <Tooltip title='Radial' arrow>
            <div
              className={classnames('gradient-type__radial', {
                'active': gradientType === 'radial',
              })}
              onClick={() => handleGradientTypeChange('radial')}
            />
          </Tooltip>
        </div>

        <Tooltip title='Swap' arrow>
          <div
            className='gradient-swap'
            onClick={handleSwapColors}
          >
            <SwapHorizIcon className='gradient-swap__icon' />
          </div>
        </Tooltip>

        <div className='gradient-angle'>
          {anglePoints.map((anglePoint) => {
            return (
              <div
                key={anglePoint.value}
                className={`
                  gradient-angle__point 
                  gradient-angle__point--${anglePoint.classModifier}
                  ${activeAnglePoint === anglePoint.value && 'active'}
                `}
                onClick={() => setActiveAnglePoint(anglePoint.value)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

GradientColorGenerator.defaultProps = {
  maxColorsCount: 5,
};

GradientColorGenerator.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  maxColorsCount: PropTypes.number,
};

export default GradientColorGenerator;