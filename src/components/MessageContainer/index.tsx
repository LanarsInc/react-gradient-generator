import React from 'react';
import ReactDom from 'react-dom';
import MessageBox from '../MessageBox';
import { IGeneralMessage } from '../../shared/types/interfaces';

import './MessageContainer.scss';

interface MessageContainerProps {
  messages: IGeneralMessage[];
  handleRemoveMessage: (id: string) => void;
}

const MessageContainer:React.FC<MessageContainerProps> = ({ messages, handleRemoveMessage }) => {
  return ReactDom.createPortal(
    <div className='message-container'>
      {messages.map((message) =>
        <MessageBox
          key={message.id}
          id={message.id}
          text={message.text}
          lifeTime={message.lifeTime}
          onClose={handleRemoveMessage}
        />
      )}
    </div>,
    document.getElementById('portal')!
  );
};

export default MessageContainer;
