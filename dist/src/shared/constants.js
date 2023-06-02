export var GradientTypes;
(function (GradientTypes) {
    GradientTypes["LINEAR"] = "linear";
    GradientTypes["RADIAL"] = "radial";
})(GradientTypes || (GradientTypes = {}));
export var ThemeMode;
(function (ThemeMode) {
    ThemeMode["DARK"] = "dark";
    ThemeMode["LIGHT"] = "light";
})(ThemeMode || (ThemeMode = {}));
export var messageLifeTime = 3000;
export var themeModeLocalStorageKey = 'gradient-generator-theme-mode';
export var maxColorsCount = 19;
export var hexColorRegExp = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
export var defaultHexColor = '#000000';
export var defaultGradient = 'linear-gradient(180deg, rgba(242, 178, 56, 1) 0%, rgba(240, 103, 25, 1) 100%)';
//# sourceMappingURL=constants.js.map