import React, { useEffect, useRef, useCallback } from 'react';
import { ReactComponent as CloseIconBig } from '../../assets/svg/close-big.svg';
import './MessageBox.scss';
var MessageBox = function (_a) {
    var id = _a.id, text = _a.text, lifeTime = _a.lifeTime, onClose = _a.onClose;
    var messageRef = useRef(null);
    var handleCloseMessage = useCallback(function () {
        var _a;
        (_a = messageRef.current) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
        setTimeout(function () { return onClose(id); }, 600);
    }, [id, onClose]);
    useEffect(function () {
        var timer = setTimeout(function () { return handleCloseMessage(); }, lifeTime);
        return function () { return clearTimeout(timer); };
    }, [lifeTime, handleCloseMessage]);
    return (React.createElement("div", { ref: messageRef, className: "message-box" },
        React.createElement("p", { className: "message-box__text" }, text),
        React.createElement(CloseIconBig, { className: "message-box__icon", onClick: handleCloseMessage })));
};
export default MessageBox;
//# sourceMappingURL=index.js.map