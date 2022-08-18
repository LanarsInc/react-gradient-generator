import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';
import variables from '../../../styles/variables.module.scss';

import './MultiThumbSlider.scss';


const MultiThumbSlider = ({
  maxColorsCount,
  palettes,
  focusPalette,
  setPalettes,
  handleSliderThumbClick,
}) => {

  const sliderContainerRef = useRef(null);

  useEffect(() => {
    const sliders = sliderContainerRef.current.querySelectorAll('.multi-thumb-slider__input');

    sliders.forEach((slider) => {
      slider.oninput = handleRangeChange;
      slider.oninput();
    });
  }, [palettes.length]);

  const handleRangeChange = () => {
    const sliders = sliderContainerRef.current.querySelectorAll('.multi-thumb-slider__input');

    const newArray = Array.from(sliders).map((element) => ({
      id: element.dataset.id,
      position: element.value,
      color: element.dataset.color,
    }));

    setPalettes(newArray);
  };

  const handleAddNewSlider = (e) => {
    const mousePosition = e.nativeEvent.offsetX;
    const positionForInput = mousePosition * 100 / variables.gradientPreviewWidth;

    if (e.target === sliderContainerRef.current) {
      setPalettes((prevState) => ([
        ...prevState,
        {id: uuidv4(), color: 'rgb(0, 0, 0)', position: positionForInput},
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
            'active': focusPalette?.id === palette.id,
          })}
          style={{'--gradient-thumb-color': palette.color}}
          onClick={() => handleSliderThumbClick(palette)}
          readOnly
          data-color={palette.color}
          data-id={palette.id}
          value={palette.position}
          min='0'
          max='100'
          step='1'
          type='range'
        />
      )}
    </div>
  );
};

MultiThumbSlider.propTypes = {
  maxColorsCount: PropTypes.number.isRequired,
  palettes: PropTypes.arrayOf(PropTypes.object),
  focusPalette: PropTypes.object,
  setPalettes: PropTypes.func.isRequired,
  handleSliderThumbClick: PropTypes.func.isRequired,
};

export default MultiThumbSlider;