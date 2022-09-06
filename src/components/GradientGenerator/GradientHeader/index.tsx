import React from 'react';
// @ts-ignore
import { ReactComponent as Logo } from './../../../assets/svg/logo.svg';

import './GradientHeader.scss';

interface GradientHeaderProps {
    resetGradient: () => void;
}

const GradientHeader:React.FC<GradientHeaderProps> = ({ resetGradient }) => (
  <div className="gradient-header">
    <div>
      <Logo className="gradient-header__icon" />
      <h1 className="gradient-header__title">CSS Gradient</h1>
    </div>

    <button
      className="gradient-header__reset-btn"
      onClick={ resetGradient }
    >
        reset
    </button>
  </div>
);

export default GradientHeader;
