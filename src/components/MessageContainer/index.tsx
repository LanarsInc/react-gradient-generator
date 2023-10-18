import React from 'react';
import ReactDom from 'react-dom';
import MessageBox from '@components/MessageBox';
import { GeneralMessage } from '@shared/types/interfaces';

import './MessageContainer.scss';

interface MessageContainerProps {
  messages: GeneralMessage[];
  handleRemoveMessage: (id: string) => void;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  messages,
  handleRemoveMessage,
}) =>
  ReactDom.createPortal(
    <div className="message-container">
      {messages.map((message) => (
        <MessageBox
          key={message.id}
          id={message.id}
          text={message.text}
          lifeTime={message.lifeTime}
          onClose={handleRemoveMessage}
        />
      ))}
    </div>,
    document.getElementById('portal')!
  );

export default MessageContainer;
