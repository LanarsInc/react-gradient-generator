import React from 'react';
import classnames from 'classnames';
import { ReactComponent as CloseIcon } from '../../../assets/svg/close.svg';
import './GradientPreview.scss';
var GradientPreview = function (_a) {
    var palettes = _a.palettes, activePaletteId = _a.activePaletteId, gradient = _a.gradient, setActivePalette = _a.setActivePalette, handleDeletePalette = _a.handleDeletePalette;
    return (React.createElement("section", { className: "gradient-preview" },
        React.createElement("div", { className: "gradient-preview__panel" }, palettes
            .sort(function (paletteA, paletteB) { return paletteA.position - paletteB.position; })
            .map(function (pallet) { return (React.createElement("div", { key: pallet.id, className: classnames('gradient-preview-pallet', {
                active: pallet.id === activePaletteId,
            }), onClick: function () { return setActivePalette(pallet); } },
            React.createElement("div", { className: "gradient-preview-pallet__inner", style: { backgroundColor: pallet.color } }),
            React.createElement("div", { className: classnames('gradient-preview-pallet__delete-btn', {
                    canDelete: palettes.length > 2,
                }), onClick: function () { return handleDeletePalette(pallet.id); } },
                React.createElement(CloseIcon, { className: "gradient-preview-pallet__delete-icon" })))); })),
        React.createElement("div", { className: "gradient-preview__gradient-container" },
            React.createElement("div", { className: "gradient-preview__gradient", style: { background: gradient } }))));
};
export default GradientPreview;
//# sourceMappingURL=index.js.map