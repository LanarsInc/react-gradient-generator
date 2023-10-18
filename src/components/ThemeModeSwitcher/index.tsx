import React from 'react';
import classnames from 'classnames';
import { ThemeMode } from '@shared/constants';

import SunIcon from '@assets/svg/sun.svg?react';
import MoonIcon from '@assets/svg/moon.svg?react';

import './ThemeModeSwitcher.scss';

interface ThemeModeSwitcherProps {
  activeThemeMode: ThemeMode | null;
  toggleThemeMode: () => void;
}

const ThemeModeSwitcher: React.FC<ThemeModeSwitcherProps> = ({
  activeThemeMode,
  toggleThemeMode,
}) => {
  return (
    <div
      className={classnames('theme-mode-switcher', {
        dark: activeThemeMode === ThemeMode.DARK,
        light: activeThemeMode === ThemeMode.LIGHT,
      })}
      onClick={() => toggleThemeMode()}
    >
      <div className="theme-mode-switcher__circle" />
      <SunIcon className="theme-mode-switcher__icon sun" />
      <MoonIcon className="theme-mode-switcher__icon moon" />
    </div>
  );
};

export default ThemeModeSwitcher;
