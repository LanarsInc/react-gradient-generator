import React from 'react';
import classnames from 'classnames';
import { ThemeMode } from '../../shared/constants';
import { ReactComponent as SunIcon } from '../../assets/svg/sun.svg';
import { ReactComponent as MoonIcon } from '../../assets/svg/moon.svg';
import './ThemeModeSwitcher.scss';
var ThemeModeSwitcher = function (_a) {
    var activeThemeMode = _a.activeThemeMode, toggleThemeMode = _a.toggleThemeMode;
    return (React.createElement("div", { className: classnames('theme-mode-switcher', {
            dark: activeThemeMode === ThemeMode.DARK,
            light: activeThemeMode === ThemeMode.LIGHT,
        }), onClick: function () { return toggleThemeMode(); } },
        React.createElement("div", { className: "theme-mode-switcher__circle" }),
        React.createElement(SunIcon, { className: "theme-mode-switcher__icon sun" }),
        React.createElement(MoonIcon, { className: "theme-mode-switcher__icon moon" })));
};
export default ThemeModeSwitcher;
//# sourceMappingURL=index.js.map