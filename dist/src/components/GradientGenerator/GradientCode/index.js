import React, { useRef, useState, useCallback } from 'react';
import { messageLifeTime } from '../../../shared/constants';
import './GradientCode.scss';
var GradientCode = function (_a) {
    var gradient = _a.gradient, resetGradient = _a.resetGradient, addNewMessage = _a.addNewMessage;
    var codePreviewContainerRef = useRef(null);
    var _b = useState(6), linesNumber = _b[0], setLinesNumber = _b[1];
    var _c = useState(0), height = _c[0], setHeight = _c[1];
    var measuredRef = useCallback(function (node) {
        if (node !== null) {
            setHeight(node.getBoundingClientRect().height);
        }
    }, []);
    var handleCopyGradientCode = function () {
        navigator.clipboard.writeText("background: ".concat(gradient, ";"));
        addNewMessage({
            text: 'CSS code has been copied',
            lifeTime: messageLifeTime,
        });
    };
    return (React.createElement("section", { className: "gradient-code" },
        React.createElement("div", { className: "gradient-code__top" },
            React.createElement("div", { className: "gradient-code-lines" }, Array.from(Array(linesNumber).keys()).map(function (number) { return (React.createElement("p", { key: number, className: "gradient-code-line" }, number + 1)); })),
            React.createElement("div", { className: "gradient-code-label" }, "CSS"),
            React.createElement("div", { ref: codePreviewContainerRef, className: "gradient-code-preview" },
                React.createElement("span", { className: "gradient-code-preview__key" }, "background"),
                ":",
                React.createElement("span", { className: "gradient-code-preview__value" }, " ".concat(gradient, ";")))),
        React.createElement("div", { className: "gradient-code__bottom" },
            React.createElement("button", { type: "button", className: "gradient-code__reset-btn", onClick: resetGradient }, "reset"),
            React.createElement("button", { type: "button", className: "gradient-code__copy-btn", onClick: handleCopyGradientCode }, "Copy CSS"))));
};
export default GradientCode;
//# sourceMappingURL=index.js.map