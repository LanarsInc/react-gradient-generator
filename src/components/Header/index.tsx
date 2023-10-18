import React from 'react';
import { motion as m } from 'framer-motion';
import ThemeModeSwitcher from '@components/ThemeModeSwitcher';
import { ThemeMode } from '@shared/constants';
import { SectionAppearAnimation } from '@shared/animation';
import Logo from '@assets/svg/logo.svg?react';

import './Header.scss';

interface HeaderProps {
  activeThemeMode: ThemeMode | null;
  toggleThemeMode: () => void;
}

const Header: React.FC<HeaderProps> = ({
  activeThemeMode,
  toggleThemeMode,
}) => (
  // add wrapper div to prevent unwanted scrolling
  <div>
    <m.header
      initial={SectionAppearAnimation.initial}
      animate={SectionAppearAnimation.animate}
      transition={SectionAppearAnimation.transition(0)}
      className="header"
    >
      <div className="logo">
        <Logo className="logo__icon" />
        <h1 className="logo__title">CSS Gradient</h1>
      </div>

      <ThemeModeSwitcher
        activeThemeMode={activeThemeMode}
        toggleThemeMode={toggleThemeMode}
      />
    </m.header>
  </div>
);

export default Header;
