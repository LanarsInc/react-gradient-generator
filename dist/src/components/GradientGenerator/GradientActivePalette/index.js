import React, { useEffect, useState, useRef } from 'react';
import { HexColorPicker as Picker } from 'react-colorful';
import { allowOnlyNumbers, hex2rgb, rgb2hex } from '../../../shared/utils';
import { useOutsideClick } from '../../../shared/hooks/useOutsideClick';
import { defaultHexColor, hexColorRegExp } from '../../../shared/constants';
import { ReactComponent as TrashIcon } from '../../../assets/svg/trash.svg';
import './GradientActivePalette.scss';
var GradientActivePalette = function (_a) {
    var _b;
    var activePalette = _a.activePalette, canDeletePalette = _a.canDeletePalette, handleGradientColorChange = _a.handleGradientColorChange, handleDeletePalette = _a.handleDeletePalette;
    var _c = useState(false), isShowColorPicker = _c[0], setIsShowColorPicker = _c[1];
    var _d = useState(defaultHexColor), hexColor = _d[0], setHexColor = _d[1];
    var _e = useState({
        red: 255,
        green: 255,
        blue: 255,
        alpha: 1,
    }), rgbObject = _e[0], setRgbObject = _e[1];
    var _f = useState(100), colorOpacity = _f[0], setColorOpacity = _f[1];
    var _g = useState('100%'), colorOpacityInput = _g[0], setColorOpacityInput = _g[1];
    var previewRef = useRef(null);
    var pickerWrapperRef = useOutsideClick(function () { return setIsShowColorPicker(false); }, previewRef === null || previewRef === void 0 ? void 0 : previewRef.current);
    useEffect(function () {
        var colorInHex = rgb2hex(activePalette.color);
        var colorInRGB = hex2rgb(colorInHex);
        var alpha = parseFloat(activePalette.color.split(',')[3]);
        var opacity = Math.round(alpha * 100);
        setHexColor(colorInHex);
        setRgbObject(colorInRGB);
        setColorOpacity(opacity);
        setColorOpacityInput("".concat(opacity, "%"));
    }, [activePalette.color]);
    var handleBlurColorInput = function (color) {
        if (hexColorRegExp.test(color)) {
            handleGradientColorChange(hexColor);
        }
        else {
            setHexColor(defaultHexColor);
            handleGradientColorChange(defaultHexColor);
        }
    };
    var handleKeyDownColorInput = function (event) {
        if (event.keyCode === 13) {
            event.target.blur();
        }
    };
    var handleChangeColorOpacity = function (value) {
        var red = rgbObject.red, green = rgbObject.green, blue = rgbObject.blue;
        var opacity = !value ? 0 : parseInt(value, 10);
        if (opacity > 100) {
            opacity = 100;
        }
        setColorOpacity(opacity);
        setColorOpacityInput("".concat(opacity, "%"));
        handleGradientColorChange("rgba(".concat(red, ", ").concat(green, ", ").concat(blue, ", ").concat(opacity / 100, ")"), true);
    };
    var handleKeyDownColorOpacityInput = function (event) {
        if (event.keyCode === 13) {
            event.target.blur();
        }
        allowOnlyNumbers(event);
    };
    var red = rgbObject.red, green = rgbObject.green, blue = rgbObject.blue;
    return (React.createElement("section", { className: "gradient-active-color" },
        React.createElement("h3", { className: "gradient-generator__subheader" }, "Color"),
        React.createElement("div", { className: "gradient-active-color__content" },
            React.createElement("div", { ref: previewRef, className: "gradient-active-color__preview", style: { backgroundColor: hexColor }, onClick: function () { return setIsShowColorPicker(function (prevState) { return !prevState; }); } }),
            isShowColorPicker && (React.createElement("div", { ref: pickerWrapperRef, className: "gradient-active-color__picker-wrapper" },
                React.createElement(Picker, { color: hexColor, onChange: function (valueInHex) { return handleGradientColorChange(valueInHex); } }))),
            React.createElement("div", { className: "gradient-active-color__settings" },
                React.createElement("div", { className: "gradient-active-color__inputs-container" },
                    React.createElement("input", { className: "gradient-active-color__input", placeholder: "Color", value: hexColor, onChange: function (event) { return setHexColor(event.target.value); }, onBlur: function (event) { return handleBlurColorInput(event.target.value); }, onKeyDown: handleKeyDownColorInput }),
                    React.createElement("input", { className: "gradient-active-color__input", value: colorOpacityInput, onChange: function (event) { return setColorOpacityInput(event.target.value); }, onBlur: function (event) { return handleChangeColorOpacity(event.target.value); }, onKeyDown: handleKeyDownColorOpacityInput })),
                React.createElement("div", { className: "gradient-active-color__slider-container" },
                    React.createElement("input", { id: "myRange", className: "gradient-active-color__slider", type: "range", min: "0", max: "100", style: (_b = {},
                            _b['--slider-thumb-color'] = hexColor,
                            _b.background = "linear-gradient(to right, rgba(".concat(red, ", ").concat(green, ", ").concat(blue, ", 0), rgba(").concat(red, ", ").concat(green, ", ").concat(blue, ", 1))"),
                            _b), value: colorOpacity, onChange: function (event) { return handleChangeColorOpacity(event.target.value); } }))),
            React.createElement("button", { type: "button", className: "gradient-active-color__delete-btn", disabled: !canDeletePalette, onClick: function () { return handleDeletePalette(activePalette.id); } },
                React.createElement(TrashIcon, { className: "gradient-active-color__delete-icon" })))));
};
export default GradientActivePalette;
//# sourceMappingURL=index.js.map