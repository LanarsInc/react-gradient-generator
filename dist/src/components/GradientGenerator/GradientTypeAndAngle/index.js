import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { allowOnlyNumbers } from '../../../shared/utils';
import { GradientTypes } from '../../../shared/constants';
import { ReactComponent as AngleCircleIcon } from '../../../assets/svg/angle-circle.svg';
import './GradientTypeAndAngle.scss';
var radianPickZoneDimension = 62;
var GradientTypeAndAngle = function (_a) {
    var gradientType = _a.gradientType, gradientPosition = _a.gradientPosition, handleGradientTypeChange = _a.handleGradientTypeChange, setGradientPosition = _a.setGradientPosition;
    var pickZoneRef = useRef(null);
    var _b = useState(false), isMouseDown = _b[0], setIsMouseDown = _b[1];
    var _c = useState('0\xB0'), angelInDegree = _c[0], setAngelInDegree = _c[1];
    var _d = useState(50), radialXPosition = _d[0], setRadialXPosition = _d[1];
    var _e = useState(50), radialYPosition = _e[0], setRadialYPosition = _e[1];
    useEffect(function () {
        document.addEventListener('mousedown', function () {
            setIsMouseDown(true);
        });
        document.addEventListener('mouseup', function () {
            setIsMouseDown(false);
        });
        return function () {
            document.removeEventListener('mousedown', function () {
                setIsMouseDown(true);
            });
            document.removeEventListener('mouseup', function () {
                setIsMouseDown(false);
            });
        };
    }, []);
    useEffect(function () {
        if (gradientPosition) {
            if (gradientType === GradientTypes.LINEAR) {
                setAngelInDegree("".concat(parseInt(gradientPosition, 10), "\u00B0"));
            }
            if (gradientType === GradientTypes.RADIAL) {
                var splitRadialPosition = gradientPosition.split(' ');
                var xPosition = parseInt(splitRadialPosition[2], 10);
                var yPosition = parseInt(splitRadialPosition[3], 10);
                setRadialXPosition(xPosition);
                setRadialYPosition(yPosition);
            }
        }
    }, [gradientPosition, gradientType]);
    var handleLinearCircleClick = function (event) {
        var _a;
        var rect = (_a = pickZoneRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        if (rect) {
            var top_1 = rect.top, bottom = rect.bottom, left = rect.left, right = rect.right;
            var xCircleCenter = (left + right) / 2;
            var yCircleCenter = (top_1 + bottom) / 2;
            var xMouse = event.clientX;
            var yMouse = event.clientY;
            var deltaX = xCircleCenter - xMouse;
            var deltaY = yCircleCenter - yMouse;
            var rad = Math.atan2(deltaY, deltaX);
            var deg = Math.round(rad * (180 / Math.PI)) - 90;
            if (deg < 0) {
                deg = (deg + 360) % 360;
            }
            setGradientPosition("".concat(deg, "deg"));
        }
    };
    var handleRadialSquareClick = function (event) {
        var _a;
        var rect = (_a = pickZoneRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        if (rect) {
            var right = rect.right, bottom = rect.bottom;
            var xMouse = event.clientX;
            var yMouse = event.clientY;
            var deltaX = right - xMouse;
            var deltaY = bottom - yMouse;
            var percentageDeltaX = Math.round(100 - (deltaX * 100) / radianPickZoneDimension);
            var percentageDeltaY = Math.round(100 - (deltaY * 100) / radianPickZoneDimension);
            var finaleXPosition = void 0;
            var finaleYPosition = void 0;
            if (percentageDeltaX < 0) {
                finaleXPosition = 0;
            }
            else if (percentageDeltaX > 100) {
                finaleXPosition = 100;
            }
            else {
                finaleXPosition = percentageDeltaX;
            }
            if (percentageDeltaY < 0) {
                finaleYPosition = 0;
            }
            else if (percentageDeltaY > 100) {
                finaleYPosition = 100;
            }
            else {
                finaleYPosition = percentageDeltaY;
            }
            setGradientPosition("circle at ".concat(finaleXPosition, "% ").concat(finaleYPosition, "%"));
        }
    };
    var handleDegreeChange = function (value) {
        setAngelInDegree(value);
    };
    var handleDegreeBlur = function (value) {
        var degree = !value ? 0 : parseInt(value, 10);
        if (degree > 360) {
            degree = 360;
        }
        setGradientPosition("".concat(degree, "deg"));
    };
    var handleDegreeKeyDown = function (event) {
        if (event.keyCode === 13) {
            event.target.blur();
        }
        allowOnlyNumbers(event);
    };
    return (React.createElement("section", { className: "gradient-type-and-angle" },
        React.createElement("div", { className: "gradient-type" },
            React.createElement("h3", { className: "gradient-generator__subheader" }, "Type"),
            React.createElement("div", { className: "gradient-type__buttons-container" },
                React.createElement("button", { type: "button", className: classnames('gradient-type__btn', {
                        active: gradientType === GradientTypes.LINEAR,
                    }), onClick: function () {
                        return handleGradientTypeChange(GradientTypes.LINEAR, "".concat(parseInt(angelInDegree, 10), "deg"));
                    } }, "Linear"),
                React.createElement("button", { type: "button", className: classnames('gradient-type__btn', {
                        active: gradientType === GradientTypes.RADIAL,
                    }), onClick: function () {
                        return handleGradientTypeChange(GradientTypes.RADIAL, "circle at ".concat(radialXPosition, "% ").concat(radialYPosition, "%"));
                    } }, "Radial"))),
        gradientType === GradientTypes.LINEAR ? (React.createElement("div", { className: "gradient-angle-linear" },
            React.createElement("h3", { className: "gradient-generator__subheader" }, "Angle"),
            React.createElement("div", { className: "gradient-angle-linear__content" },
                React.createElement("div", { ref: pickZoneRef, className: "gradient-angle-linear__circle", style: {
                        rotate: "".concat(parseInt(angelInDegree, 10), "deg"),
                    }, onMouseMove: isMouseDown ? handleLinearCircleClick : undefined, onClick: handleLinearCircleClick },
                    React.createElement(AngleCircleIcon, { className: "gradient-angle-linear__icon" }),
                    React.createElement("div", { className: "gradient-angle-linear__dot" })),
                React.createElement("input", { className: "gradient-angle-linear__input", value: angelInDegree, onChange: function (event) { return handleDegreeChange(event.target.value); }, onBlur: function (event) { return handleDegreeBlur(event.target.value); }, onKeyDown: handleDegreeKeyDown })))) : (React.createElement("div", { className: "gradient-angle-radial" },
            React.createElement("h3", { className: "gradient-generator__subheader" }, "Position"),
            React.createElement("div", { className: "gradient-angle-radial__content" },
                React.createElement("div", { className: "gradient-angle-radial__square-wrapper", style: {
                        width: "".concat(radianPickZoneDimension, "px"),
                        height: "".concat(radianPickZoneDimension, "px"),
                    }, onClick: handleRadialSquareClick, onMouseMove: isMouseDown ? handleRadialSquareClick : undefined },
                    React.createElement("div", { ref: pickZoneRef, className: "gradient-angle-radial__square", style: {
                            width: "".concat(radianPickZoneDimension, "px"),
                            height: "".concat(radianPickZoneDimension, "px"),
                        } },
                        React.createElement("div", { className: "gradient-angle-radial__dot", style: {
                                top: "".concat(radialYPosition, "%"),
                                left: "".concat(radialXPosition, "%"),
                            } }))))))));
};
export default GradientTypeAndAngle;
//# sourceMappingURL=index.js.map