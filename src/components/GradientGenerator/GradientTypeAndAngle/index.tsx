import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { allowOnlyNumbers } from '../../../shared/utils';
import { GradientTypes } from '../../../shared/constants';

import { ReactComponent as AngleCircleIcon } from '../../../assets/svg/angle-circle.svg';

import './GradientTypeAndAngle.scss';

interface GradientTypeAndAngleProps {
  gradientType: GradientTypes;
  gradientPosition: string;
  handleGradientTypeChange: (type: string, position: string) => void;
  setGradientPosition: (position: string) => void;
}

const radianPickZoneDimension = 62;

const GradientTypeAndAngle: React.FC<GradientTypeAndAngleProps> = ({
  gradientType,
  gradientPosition,
  handleGradientTypeChange,
  setGradientPosition,
}) => {
  const pickZoneRef = useRef<HTMLDivElement | null>(null);

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [angleInDegree, setAngleInDegree] = useState<string>('0\xB0');
  const [radialXPosition, setRadialXPosition] = useState<number>(50);
  const [radialYPosition, setRadialYPosition] = useState<number>(50);

  useEffect(() => {
    document.addEventListener('mousedown', () => setIsMouseDown(true));
    document.addEventListener('mouseup', () => setIsMouseDown(false));

    return () => {
      document.removeEventListener('mousedown', () => setIsMouseDown(true));
      document.removeEventListener('mouseup', () => setIsMouseDown(false));
    };
  }, []);

  useEffect(() => {
    if (gradientPosition) {
      if (gradientType === GradientTypes.LINEAR) {
        setAngleInDegree(`${parseInt(gradientPosition, 10)}\xB0`);
      }

      if (gradientType === GradientTypes.RADIAL) {
        const splitRadialPosition = gradientPosition.split(' ');
        const xPosition = parseInt(splitRadialPosition[2], 10);
        const yPosition = parseInt(splitRadialPosition[3], 10);

        setRadialXPosition(xPosition);
        setRadialYPosition(yPosition);
      }
    }
  }, [gradientPosition, gradientType]);

  const handleLinearCircleClick = (event) => {
    const rect = pickZoneRef.current?.getBoundingClientRect();

    if (rect) {
      const { top, bottom, left, right } = rect;

      const xCircleCenter = (left + right) / 2;
      const yCircleCenter = (top + bottom) / 2;

      let xPoint = event.clientX;
      let yPoint = event.clientY;

      if (event.type === 'touchmove') {
        xPoint = event.touches[0].clientX;
        yPoint = event.touches[0].clientY;
      }

      const deltaX = xCircleCenter - xPoint;
      const deltaY = yCircleCenter - yPoint;

      const rad = Math.atan2(deltaY, deltaX);
      let deg = Math.round(rad * (180 / Math.PI)) - 90;

      if (deg < 0) {
        deg = (deg + 360) % 360;
      }

      setGradientPosition(`${deg}deg`);
    }
  };

  const handleRadialSquareClick = (event) => {
    const rect = pickZoneRef.current?.getBoundingClientRect();

    if (rect) {
      const { right, bottom } = rect;

      let xPoint = event.clientX;
      let yPoint = event.clientY;

      if (event.type === 'touchmove') {
        xPoint = event.touches[0].clientX;
        yPoint = event.touches[0].clientY;
      }

      const deltaX = right - xPoint;
      const deltaY = bottom - yPoint;

      const percentageDeltaX = Math.round(
        100 - (deltaX * 100) / radianPickZoneDimension
      );
      const percentageDeltaY = Math.round(
        100 - (deltaY * 100) / radianPickZoneDimension
      );

      let finaleXPosition;
      let finaleYPosition;

      if (percentageDeltaX < 0) {
        finaleXPosition = 0;
      } else if (percentageDeltaX > 100) {
        finaleXPosition = 100;
      } else {
        finaleXPosition = percentageDeltaX;
      }

      if (percentageDeltaY < 0) {
        finaleYPosition = 0;
      } else if (percentageDeltaY > 100) {
        finaleYPosition = 100;
      } else {
        finaleYPosition = percentageDeltaY;
      }

      setGradientPosition(`circle at ${finaleXPosition}% ${finaleYPosition}%`);
    }
  };

  const handleDegreeChange = (value: string) => {
    setAngleInDegree(value);
  };

  const handleDegreeBlur = (value: string) => {
    let degree = !value ? 0 : parseInt(value, 10);

    if (degree > 360) {
      degree = 360;
    }

    setGradientPosition(`${degree}deg`);
  };

  const handleDegreeKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.target.blur();
    }

    allowOnlyNumbers(event);
  };

  return (
    <section className="gradient-type-and-angle">
      <div className="gradient-type">
        <h2 className="gradient-generator__subheader">Type</h2>

        <div className="gradient-type__buttons-container">
          <button
            type="button"
            className={classnames('gradient-type__btn', {
              active: gradientType === GradientTypes.LINEAR,
            })}
            onClick={() =>
              handleGradientTypeChange(
                GradientTypes.LINEAR,
                `${parseInt(angleInDegree as string, 10)}deg`
              )
            }
          >
            Linear
          </button>
          <button
            type="button"
            className={classnames('gradient-type__btn', {
              active: gradientType === GradientTypes.RADIAL,
            })}
            onClick={() =>
              handleGradientTypeChange(
                GradientTypes.RADIAL,
                `circle at ${radialXPosition}% ${radialYPosition}%`
              )
            }
          >
            Radial
          </button>
        </div>
      </div>

      {gradientType === GradientTypes.LINEAR ? (
        <div className="gradient-angle-linear">
          <h2 className="gradient-generator__subheader">Angle</h2>

          <div className="gradient-angle-linear__content">
            <div
              ref={pickZoneRef}
              className="gradient-angle-linear__circle"
              style={{
                rotate: `${parseInt(angleInDegree as string, 10)}deg`,
              }}
              onClick={handleLinearCircleClick}
              onMouseMove={isMouseDown ? handleLinearCircleClick : undefined}
              onTouchMove={handleLinearCircleClick}
            >
              <AngleCircleIcon className="gradient-angle-linear__icon" />
              <div className="gradient-angle-linear__dot" />
            </div>

            <input
              aria-label="angle"
              className="gradient-angle-linear__input"
              value={angleInDegree}
              onChange={(event) => handleDegreeChange(event.target.value)}
              onBlur={(event) => handleDegreeBlur(event.target.value)}
              onKeyDown={handleDegreeKeyDown}
            />
          </div>
        </div>
      ) : (
        <div className="gradient-angle-radial">
          <h2 className="gradient-generator__subheader">Position</h2>
          <div className="gradient-angle-radial__content">
            <div
              className="gradient-angle-radial__square-wrapper"
              style={{
                width: `${radianPickZoneDimension}px`,
                height: `${radianPickZoneDimension}px`,
              }}
              onClick={handleRadialSquareClick}
              onMouseMove={isMouseDown ? handleRadialSquareClick : undefined}
              onTouchMove={handleRadialSquareClick}
            >
              <div
                ref={pickZoneRef}
                className="gradient-angle-radial__square"
                style={{
                  width: `${radianPickZoneDimension}px`,
                  height: `${radianPickZoneDimension}px`,
                }}
              >
                <div
                  className="gradient-angle-radial__dot"
                  style={{
                    top: `${radialYPosition}%`,
                    left: `${radialXPosition}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GradientTypeAndAngle;
