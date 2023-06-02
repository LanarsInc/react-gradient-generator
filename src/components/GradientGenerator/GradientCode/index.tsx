import React from 'react';
import { GeneralMessage } from '../../../shared/types/interfaces';
import { messageLifeTime } from '../../../shared/constants';

import './GradientCode.scss';

const linesNumber = 7;

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
  const handleCopyGradientCode = () => {
    navigator.clipboard.writeText(`background: ${gradient};`);
    addNewMessage({
      text: 'CSS code has been copied',
      lifeTime: messageLifeTime,
    });
  };

  return (
    <div className="gradient-code">
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
          <span className="gradient-code-preview__key">background</span>:
          <span className="gradient-code-preview__value">
            {` ${gradient};`}
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
    </div>
  );
};

export default GradientCode;
