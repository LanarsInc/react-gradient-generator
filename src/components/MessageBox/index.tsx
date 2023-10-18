import React, { useEffect, useRef, useCallback } from 'react';
import { GeneralMessage } from '@shared/types/interfaces';

import CloseIconBig from '@assets/svg/close-big.svg?react';

import './MessageBox.scss';

interface MessageBoxProps extends GeneralMessage {
  onClose: (id: string) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  id,
  text,
  lifeTime,
  onClose,
}) => {
  const messageRef = useRef<HTMLDivElement | null>(null);

  const handleCloseMessage = useCallback(() => {
    messageRef.current?.classList.add('hide');
    setTimeout(() => onClose(id), 600);
  }, [id, onClose]);

  useEffect(() => {
    const timer = setTimeout(() => handleCloseMessage(), lifeTime);

    return () => clearTimeout(timer);
  }, [lifeTime, handleCloseMessage]);

  return (
    <div ref={messageRef} className="message-box">
      <p className="message-box__text">{text}</p>

      <CloseIconBig
        className="message-box__icon"
        onClick={handleCloseMessage}
      />
    </div>
  );
};

export default MessageBox;
