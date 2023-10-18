import React, { useState, useRef, useEffect } from 'react';
import { motion as m } from 'framer-motion';
import { GeneralMessage } from '@shared/types/interfaces';
import { gradientCodeLineHeight, messageLifeTime } from '@shared/constants';
import { SectionAppearAnimation } from '@shared/animation';

import './GradientCode.scss';

const defaultLinesNumber = 6;

interface GradientCodeProps {
  gradient: string;
  resetGradient: () => void;
  addNewMessage: (newMessage: Omit<GeneralMessage, 'id'>) => void;
}

const GradientCode: React.FC<GradientCodeProps> = ({
  gradient,
  resetGradient,
  addNewMessage,
}) => {
  const [linesNumber, setLinesNumber] = useState(defaultLinesNumber);
  const codeContainerRef = useRef<HTMLSpanElement>(null);

  const handleCalculateLinesNumber = () => {
    const codeHeight = codeContainerRef.current?.offsetHeight ?? 100;
    const neededLinesNumber = Math.ceil(
      codeHeight / parseInt(gradientCodeLineHeight, 10)
    );

    setLinesNumber(
      neededLinesNumber > defaultLinesNumber
        ? neededLinesNumber
        : defaultLinesNumber
    );
  };

  useEffect(() => {
    document.fonts.ready.then(() => handleCalculateLinesNumber());
    window.addEventListener('resize', handleCalculateLinesNumber);

    return () =>
      window.removeEventListener('resize', handleCalculateLinesNumber);
  }, []);

  useEffect(() => {
    handleCalculateLinesNumber();
  }, [gradient]);

  const handleCopyGradientCode = () => {
    navigator.clipboard.writeText(`background: ${gradient};`);
    addNewMessage({
      text: 'CSS code has been copied',
      lifeTime: messageLifeTime,
    });
  };

  return (
    <m.section
      initial={SectionAppearAnimation.initial}
      animate={SectionAppearAnimation.animate}
      transition={SectionAppearAnimation.transition(0.9)}
      className="gradient-code"
    >
      <div className="gradient-code__top">
        <div className="gradient-code-lines">
          {Array.from(Array(linesNumber).keys()).map((number) => (
            <p key={number} className="gradient-code-line">
              {number + 1}
            </p>
          ))}
        </div>

        <div className="gradient-code-label">CSS</div>

        <div className="gradient-code-preview">
          <span ref={codeContainerRef}>
            <span className="gradient-code-preview__key">background</span>:
            <span className="gradient-code-preview__value">
              {` ${gradient};`}
            </span>
          </span>
        </div>
      </div>

      <div className="gradient-code__bottom">
        <button
          type="button"
          className="gradient-code__reset-btn"
          onClick={resetGradient}
        >
          reset
        </button>

        <button
          type="button"
          className="gradient-code__copy-btn"
          onClick={handleCopyGradientCode}
        >
          Copy CSS
        </button>
      </div>
    </m.section>
  );
};

export default GradientCode;
