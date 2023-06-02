import { defaultHexColor, hexColorRegExp } from './constants';
export var splitGradientString = function (gradientString) {
    var regex = /,(?![^(]*\))(?![^"']*["'](?:[^"']*["'][^"']*["'])*[^"']*$)/gi;
    var gradientType = gradientString
        .substring(0, gradientString.indexOf('('))
        .split('-')[0];
    var secondPartOfGradient = gradientString
        .substring(gradientString.indexOf('(') + 1, gradientString.lastIndexOf(')'))
        .split(regex);
    var gradientAnglePoint = secondPartOfGradient[0];
    var isDefaultAngle = !gradientAnglePoint.includes('rgb');
    if (!isDefaultAngle) {
        gradientAnglePoint = '180deg';
    }
    var gradientPalettes = secondPartOfGradient
        .slice(Number(isDefaultAngle))
        .map(function (palette) {
        var color = palette.substring(0, palette.indexOf(')') + 1).trim();
        var position = parseInt(palette.substring(palette.indexOf(')') + 1, palette.length - 1).trim(), 10);
        return {
            color: color,
            position: position,
        };
    });
    return [gradientType, gradientAnglePoint, gradientPalettes];
};
export var hex2rgb = function (hex) {
    var validHEXInput = hexColorRegExp.exec(hex);
    if (!validHEXInput) {
        return {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
        };
    }
    return {
        red: parseInt(validHEXInput[1], 16),
        green: parseInt(validHEXInput[2], 16),
        blue: parseInt(validHEXInput[3], 16),
        alpha: 1,
    };
};
export var rgb2hex = function (color) {
    if (color) {
        var isAlpha = color.includes('a');
        var rgbPoints = color
            .substring(isAlpha ? 5 : 4, color.length - 1)
            .replace(/ /g, '')
            .split(',');
        var hexArray = rgbPoints.map(function (point) {
            var hexPoint = Number(point).toString(16);
            if (hexPoint.length === 1) {
                return "0".concat(hexPoint);
            }
            return hexPoint;
        });
        return isAlpha
            ? "#".concat(hexArray.slice(0, -1).join(''))
            : "#".concat(hexArray.join(''));
    }
    return defaultHexColor;
};
export var allowOnlyNumbers = function (event) {
    if (!/^(\d|.{2,})$/.test(event.key)) {
        event.preventDefault();
    }
};
//# sourceMappingURL=utils.js.map