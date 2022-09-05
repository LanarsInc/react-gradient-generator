import React from 'react';

import './GradientCode.scss';

const linesNumber = 6;


const GradientCode = ({ gradient, addNewMessage }) => {

  const handleCopyGradientCode = () => {
    navigator.clipboard.writeText(gradient);
    addNewMessage({
      text: 'CSS code has been copied',
      lifeTime: 3000,
    })
  };

  return (
    <div className='gradient-code'>
      <div className='gradient-code__top'>
        <div className='gradient-code-lines'>
          {[...Array(linesNumber).keys()].map((number) =>
            <p key={number} className='gradient-code-line'>
              {number + 1}
            </p>
          )}
        </div>

        <div className='gradient-code-label'>
          CSS
        </div>

        <div className='gradient-code-preview'>
          <span className='gradient-code-preview__key'>background</span>:
          <span className='gradient-code-preview__value'>
            {` ${gradient};`}
          </span>
        </div>
      </div>

      <div className='gradient-code__bottom'>
        <button
          className='gradient-code__copy-btn'
          onClick={handleCopyGradientCode}
        >
          Copy CSS
        </button>
      </div>
    </div>
  );
};

export default GradientCode;
