import React from 'react';
import ThemeModeSwitcher from '../ThemeModeSwitcher';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import './Header.scss';
var Header = function (_a) {
    var activeThemeMode = _a.activeThemeMode, toggleThemeMode = _a.toggleThemeMode;
    return (React.createElement("header", { className: "header" },
        React.createElement("div", { className: "logo" },
            React.createElement(Logo, { className: "logo__icon" }),
            React.createElement("h1", { className: "logo__title" }, "CSS Gradient")),
        React.createElement(ThemeModeSwitcher, { activeThemeMode: activeThemeMode, toggleThemeMode: toggleThemeMode })));
};
export default Header;
//# sourceMappingURL=index.js.map