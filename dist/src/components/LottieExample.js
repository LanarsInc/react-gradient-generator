import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import darkModeButton from '../assets/dark-mode-button.json';
var LottieExample = function (_a) {
    var activeThemeMode = _a.activeThemeMode, toggleThemeMode = _a.toggleThemeMode;
    var ref = useRef(null);
    useEffect(function () {
        var _a;
        (_a = ref.current) === null || _a === void 0 ? void 0 : _a.setSpeed(3);
    }, []);
    useEffect(function () {
        var _a, _b;
        if (activeThemeMode === 'dark') {
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.playSegments([0, 150], true);
        }
        else {
            (_b = ref.current) === null || _b === void 0 ? void 0 : _b.playSegments([300, 481], true);
        }
    }, [activeThemeMode]);
    return (React.createElement("div", { style: {
            width: '300px',
            height: '300px',
            cursor: 'pointer',
        }, onClick: function () { return toggleThemeMode(); } },
        React.createElement(Lottie, { lottieRef: ref, autoplay: false, loop: false, animationData: darkModeButton })));
};
export default LottieExample;
//# sourceMappingURL=LottieExample.js.map