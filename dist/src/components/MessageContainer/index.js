import React from 'react';
import ReactDom from 'react-dom';
import MessageBox from '../MessageBox';
import './MessageContainer.scss';
var MessageContainer = function (_a) {
    var messages = _a.messages, handleRemoveMessage = _a.handleRemoveMessage;
    return ReactDom.createPortal(React.createElement("div", { className: "message-container" }, messages.map(function (message) { return (React.createElement(MessageBox, { key: message.id, id: message.id, text: message.text, lifeTime: message.lifeTime, onClose: handleRemoveMessage })); })), 
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById('portal'));
};
export default MessageContainer;
//# sourceMappingURL=index.js.map