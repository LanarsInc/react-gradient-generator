import React from 'react';
import MultiThumbSlider from './MultiThumbSlider';
import { ReactComponent as SwapIcon } from '../../../assets/svg/swap.svg';
import './GradientSlider.scss';
var GradientRangeSettings = function (_a) {
    var gradient = _a.gradient, maxColorsCount = _a.maxColorsCount, palettes = _a.palettes, activePalette = _a.activePalette, setPalettes = _a.setPalettes, setActivePalette = _a.setActivePalette, handleSwapColors = _a.handleSwapColors;
    return (React.createElement("section", { className: "gradient-range-settings" },
        React.createElement("div", { className: "gradient-range-settings__slider-container", style: { background: gradient } },
            React.createElement(MultiThumbSlider, { maxColorsCount: maxColorsCount, palettes: palettes, activePalette: activePalette, setPalettes: setPalettes, setActivePalette: setActivePalette })),
        React.createElement("button", { type: "button", className: "gradient-range-settings__swap-btn", onClick: handleSwapColors },
            React.createElement(SwapIcon, { className: "gradient-range-settings__swap-icon" }))));
};
export default GradientRangeSettings;
//# sourceMappingURL=index.js.map