var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useCallback, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';
import { rgb2hex } from '../../../../shared/utils';
import './MultiThumbSlider.scss';
var MultiThumbSlider = function (_a) {
    var maxColorsCount = _a.maxColorsCount, palettes = _a.palettes, activePalette = _a.activePalette, setPalettes = _a.setPalettes, setActivePalette = _a.setActivePalette;
    var sliderContainerRef = useRef(null);
    var handleRangeChange = useCallback(function () {
        var _a;
        var sliders = (_a = sliderContainerRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.multi-thumb-slider__input');
        if (sliders) {
            var newPalettesArray = Array.from(sliders).map(function (element) {
                var _a, _b;
                return ({
                    id: (_a = element.dataset.id) !== null && _a !== void 0 ? _a : uuidv4(),
                    position: parseInt(element.value, 10),
                    color: (_b = element.dataset.color) !== null && _b !== void 0 ? _b : 'rgba(0, 0, 0, 1)',
                });
            });
            setPalettes(newPalettesArray);
        }
    }, [setPalettes]);
    useEffect(function () {
        var _a;
        var sliders = (_a = sliderContainerRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.multi-thumb-slider__input');
        if (sliders) {
            sliders.forEach(function (slider) {
                // eslint-disable-next-line no-param-reassign
                slider.oninput = handleRangeChange;
            });
        }
    }, [palettes, handleRangeChange]);
    var handleAddNewSlider = function (event) {
        var _a;
        var mousePosition = event.nativeEvent.offsetX;
        var positionForInput = Math.round((mousePosition * 100) / Number((_a = sliderContainerRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth));
        var newPalette = {
            id: uuidv4(),
            color: 'rgba(0, 0, 0, 1)',
            position: positionForInput,
        };
        if (event.target === sliderContainerRef.current) {
            setPalettes(__spreadArray(__spreadArray([], palettes, true), [newPalette], false));
            setActivePalette(newPalette);
        }
    };
    return (React.createElement("div", { ref: sliderContainerRef, className: classnames('multi-thumb-slider', {
            limit: palettes.length >= maxColorsCount,
        }), onClick: handleAddNewSlider }, palettes.map(function (palette) {
        var _a;
        return (React.createElement("input", { key: palette.id, className: classnames('multi-thumb-slider__input', {
                active: (activePalette === null || activePalette === void 0 ? void 0 : activePalette.id) === palette.id,
            }), style: (_a = {},
                _a['--gradient-thumb-color'] = rgb2hex(palette.color),
                _a), onClick: function () { return setActivePalette(palette); }, "data-color": palette.color, "data-id": palette.id, value: palette.position, readOnly: true, min: "0", max: "100", step: "1", type: "range" }));
    })));
};
export default MultiThumbSlider;
//# sourceMappingURL=index.js.map