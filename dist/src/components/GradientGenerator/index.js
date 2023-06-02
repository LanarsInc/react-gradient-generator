var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import GradientPreview from './GradientPreview';
import GradientActivePalette from './GradientActivePalette';
import GradientTypeAndAngle from './GradientTypeAndAngle';
import GradientRangeSettings from './GradientRangeSettings';
import GradientCode from './GradientCode';
import { hex2rgb, splitGradientString } from '../../shared/utils';
import { defaultGradient, GradientTypes, maxColorsCount, } from '../../shared/constants';
import './GradientGenerator.scss';
var GradientGenerator = function (_a) {
    var addNewMessage = _a.addNewMessage;
    var _b = useState(''), gradient = _b[0], setGradient = _b[1];
    var _c = useState([]), palettes = _c[0], setPalettes = _c[1];
    var _d = useState(null), activePalette = _d[0], setActivePalette = _d[1];
    var _e = useState(GradientTypes.LINEAR), gradientType = _e[0], setGradientType = _e[1];
    var _f = useState(''), gradientPosition = _f[0], setGradientPosition = _f[1];
    var handleGradientTypeChange = function (type, angle) {
        if (type === GradientTypes.LINEAR) {
            setGradientType(type);
            setGradientPosition(angle);
        }
        else {
            setGradientType(type);
            setGradientPosition(angle);
        }
    };
    var initGradient = useCallback(function (neededGradient) {
        var _a = splitGradientString(neededGradient), extractedGradientType = _a[0], extractedGradientAnglePoint = _a[1], gradientPalettes = _a[2];
        var newGradientPalettes = gradientPalettes.map(function (palette) { return (__assign(__assign({}, palette), { id: uuidv4() })); });
        setPalettes(newGradientPalettes);
        handleGradientTypeChange(extractedGradientType, extractedGradientAnglePoint);
        setActivePalette(newGradientPalettes[0]);
    }, []);
    useEffect(function () {
        initGradient(defaultGradient);
    }, [initGradient]);
    var createGradientBackground = useCallback(function () {
        var sortedPallets = __spreadArray([], palettes, true).sort(function (paletteA, paletteB) { return paletteA.position - paletteB.position; });
        var colorsAndPositionsString = sortedPallets
            .map(function (palette) { return "".concat(palette.color, " ").concat(palette.position, "%"); })
            .join(', ');
        var result = "".concat(gradientType, "-gradient(").concat(gradientPosition, ", ").concat(colorsAndPositionsString, ")");
        setGradient(result);
    }, [palettes, gradientType, gradientPosition]);
    useEffect(function () {
        createGradientBackground();
    }, [createGradientBackground, palettes, gradientType, gradientPosition]);
    var resetGradient = function () {
        initGradient(defaultGradient);
    };
    var handleGradientColorChange = function (color, isRGBA) {
        var clonePalettes = __spreadArray([], palettes, true);
        var neededPalette = clonePalettes.find(function (palette) { return palette.id === (activePalette === null || activePalette === void 0 ? void 0 : activePalette.id); });
        if (neededPalette) {
            if (isRGBA) {
                neededPalette.color = color;
            }
            else {
                var rgbColor = hex2rgb(color);
                var red = rgbColor.red, green = rgbColor.green, blue = rgbColor.blue, alpha = rgbColor.alpha;
                neededPalette.color = "rgba(".concat(red, ", ").concat(green, ", ").concat(blue, ", ").concat(alpha, ")");
            }
            setActivePalette(neededPalette);
            setPalettes(clonePalettes);
        }
    };
    var handleSwapColors = function () {
        var sortedPallets = __spreadArray([], palettes, true).sort(function (paletteA, paletteB) { return paletteA.position - paletteB.position; });
        var reversePositions = sortedPallets
            .map(function (palette) { return palette.position; })
            .reverse();
        var swappedPalettes = sortedPallets
            .map(function (palette, paletteIndex) { return (__assign(__assign({}, palette), { position: reversePositions[paletteIndex] })); })
            .sort(function (paletteA, paletteB) { return paletteA.position - paletteB.position; });
        setPalettes(swappedPalettes);
    };
    var handleDeletePalette = function (paletteId) {
        var filteredPalettes = palettes.filter(function (palette) { return palette.id !== paletteId; });
        setPalettes(filteredPalettes);
        setActivePalette(filteredPalettes[0]);
    };
    return (React.createElement("div", { className: "gradient-generator" },
        React.createElement("div", { className: "gradient-generator__main" },
            React.createElement(GradientPreview, { palettes: __spreadArray([], palettes, true), activePaletteId: activePalette === null || activePalette === void 0 ? void 0 : activePalette.id, gradient: gradient, setActivePalette: setActivePalette, handleDeletePalette: handleDeletePalette }),
            React.createElement("div", { className: "gradient-generator-settings" },
                React.createElement("div", { className: "gradient-generator-settings__top" },
                    React.createElement(GradientRangeSettings, { gradient: gradient, maxColorsCount: maxColorsCount, palettes: palettes, activePalette: activePalette, setPalettes: setPalettes, setActivePalette: setActivePalette, handleSwapColors: handleSwapColors }),
                    activePalette && (React.createElement(GradientActivePalette, { activePalette: activePalette, canDeletePalette: palettes.length > 2, handleGradientColorChange: handleGradientColorChange, handleDeletePalette: handleDeletePalette }))),
                React.createElement(GradientTypeAndAngle, { gradientType: gradientType, gradientPosition: gradientPosition, handleGradientTypeChange: handleGradientTypeChange, setGradientPosition: setGradientPosition }))),
        React.createElement(GradientCode, { gradient: gradient, resetGradient: resetGradient, addNewMessage: addNewMessage })));
};
export default GradientGenerator;
//# sourceMappingURL=index.js.map