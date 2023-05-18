import React from 'react';
import ThemeModeSwitcher from '../ThemeModeSwitcher';
import { ThemeMode } from '../../shared/constants';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';

import './Header.scss';

interface HeaderProps {
  activeThemeMode: ThemeMode | null;
  toggleThemeMode: () => void;
}

const Header: React.FC<HeaderProps> = ({
  activeThemeMode,
  toggleThemeMode,
}) => (
  <header className="header">
    <div>
      <Logo className="header__icon" />
      <h1 className="header__title">CSS Gradient</h1>
    </div>

    <ThemeModeSwitcher
      activeThemeMode={activeThemeMode}
      toggleThemeMode={toggleThemeMode}
    />
  </header>
);

export default Header;
