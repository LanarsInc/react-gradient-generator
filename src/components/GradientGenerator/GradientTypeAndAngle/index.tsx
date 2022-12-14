import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { ReactComponent as AngleCircleIcon } from './../../../assets/svg/ic_angle-circle.svg';
import { allowOnlyNumbers } from '../../../shared/utils';
import { GRADIENT_TYPES } from '../../../shared/constants';

import './GradientTypeAndAngle.scss';

interface GradientTypeAndAngleProps {
  gradientType: string;
  gradientPosition: string;
  handleGradientTypeChange: (type: string, position: string) => void;
  setGradientPosition: (position: string) => void;
}

const GradientTypeAndAngle: React.FC<GradientTypeAndAngleProps> = ({
  gradientType,
  gradientPosition,
  handleGradientTypeChange,
  setGradientPosition,
}) => {
  const circleAngleRef = useRef<HTMLDivElement | null>(null);

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [angelInDegree, setAngelInDegree] = useState<number | string | null>(null);
  const [radialXPosition, setRadialXPosition] = useState<number | null>(null);
  const [radialYPosition, setRadialYPosition] = useState<number | null>(null);

  useEffect(() => {
    window.addEventListener('mousedown', () => {
      setIsMouseDown(true);
    });

    window.addEventListener('mouseup', () => {
      setIsMouseDown(false);
    });
  }, []);

  useEffect(() => {
    if (gradientPosition) {
      if (
        gradientType === GRADIENT_TYPES.LINEAR
        && angelInDegree === null
      ) {
        setAngelInDegree(`${parseInt(gradientPosition)}\xB0`);
      }

      if (
        gradientType === GRADIENT_TYPES.RADIAL
        && radialXPosition === null
        && radialYPosition === null
      ) {
        const splitRadialPosition = gradientPosition.split(' ');
        const xPosition = parseInt(splitRadialPosition[2]);
        const yPosition = parseInt(splitRadialPosition[3]);

        setRadialXPosition(xPosition);
        setRadialYPosition(yPosition);
      }
    }
  }, [gradientPosition, gradientType, angelInDegree, radialXPosition, radialYPosition]);

  const handleLinearCircleClick = (event) => {
    const rect = circleAngleRef.current?.getBoundingClientRect();

    if (rect) {
      const { top, bottom, left, right} = rect;

      const xCircleCenter = (left + right) / 2;
      const yCircleCenter = (top + bottom) / 2;

      const xMouse = event.clientX;
      const yMouse = event.clientY;

      const deltaX = xCircleCenter - xMouse;
      const deltaY = yCircleCenter - yMouse;

      const rad = Math.atan2(deltaY, deltaX);
      let deg = Math.round(rad * (180 / Math.PI)) - 90;

      if (deg < 0) {
        deg = (deg + 360) % 360;
      }

      setAngelInDegree(`${deg}\xB0`);
      setGradientPosition(`${deg}deg`);
    }
  };

  const handleRadialCircleClick = (event) => {
    const rect = circleAngleRef.current?.getBoundingClientRect();

    if (rect) {
      const { right, bottom } = rect;

      const xMouse = event.clientX;
      const yMouse = event.clientY;

      const deltaX = right - xMouse;
      const deltaY = bottom - yMouse;

      const percentageDeltaX = Math.round(100 - (deltaX * 100 / 62));
      const percentageDeltaY = Math.round(100 - (deltaY * 100 / 62));

      if (percentageDeltaX >= 0 && percentageDeltaX <= 100) {
        setRadialXPosition(percentageDeltaX);
      }

      if (percentageDeltaY >= 0 && percentageDeltaY <= 100) {
        setRadialYPosition(percentageDeltaY);
      }

      setGradientPosition(`circle at ${percentageDeltaX}% ${percentageDeltaY}%`);
    }
  };

  const handleDegreeChange = (value) => {
    setAngelInDegree(value);
  };

  const handleDegreeBlur = (value) => {
    let degree = !value ? 0 : parseInt(value);

    if (degree > 360) {
      degree = 360;
    }

    setAngelInDegree(`${degree}\xB0`);
    setGradientPosition(`${degree}deg`);
  };

  const handleDegreeKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.target.blur();
    }

    allowOnlyNumbers(event);
  };

  return (
    <div className="gradient-type-and-angle">

      <div className="gradient-type">
        <h3 className="gradient-generator__subheader">Type</h3>

        <div className="gradient-type__buttons-container">
          <button
            className={ classnames('gradient-type__btn', { active: gradientType === GRADIENT_TYPES.LINEAR }) }
            onClick={ () => handleGradientTypeChange(
              GRADIENT_TYPES.LINEAR,
              parseInt(angelInDegree as string) ? `${parseInt(angelInDegree as string)}deg` : '0deg',
            ) }
          >
            Linear
          </button>
          <button
            className={ classnames('gradient-type__btn', { active: gradientType === GRADIENT_TYPES.RADIAL }) }
            onClick={ () => handleGradientTypeChange(
              GRADIENT_TYPES.RADIAL,
              radialXPosition && radialYPosition ? `circle at ${radialXPosition}% ${radialYPosition}%` : 'circle at 50% 50%',
            ) }
          >
            Radial
          </button>
        </div>
      </div>

      { gradientType === GRADIENT_TYPES.LINEAR
        ? <div className="gradient-angle-linear">
          <h3 className="gradient-generator__subheader">Angle</h3>

          <div className="gradient-angle-linear__content">
            <div
              ref={ circleAngleRef }
              className="gradient-angle-linear__circle"
              style={{ transform: `rotate(${parseInt(angelInDegree as string)}deg)` }}
              onMouseMove={ isMouseDown ? handleLinearCircleClick : undefined }
              onClick={ handleLinearCircleClick }
            >
              <AngleCircleIcon />
              <div className="gradient-angle-linear__dot" />
            </div>

            <input
              className="gradient-angle-linear__input"
              value={ angelInDegree || '' }
              onChange={ (event) => handleDegreeChange(event.target.value) }
              onBlur={ (event) => handleDegreeBlur(event.target.value) }
              onKeyDown={ handleDegreeKeyDown } />
          </div>
        </div>
        : <div className="gradient-angle-radial">
          <h3 className="gradient-generator__subheader">Position</h3>
          <div className="gradient-angle-radial__content">
            <div
              ref={ circleAngleRef }
              className="gradient-angle-radial__circle"
              onMouseMove={ isMouseDown ? handleRadialCircleClick : undefined }
              onClick={ handleRadialCircleClick }
            >
              <div
                className="gradient-angle-radial__dot"
                style={{
                  top: `${radialYPosition}%`,
                  left: `${radialXPosition}%`,
                }} />
            </div>
          </div>
        </div>
      }

    </div>
  );
};

export default GradientTypeAndAngle;
