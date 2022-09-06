import React, { useEffect, useRef } from 'react';
// @ts-ignore
import { ReactComponent as CloseIconBig } from './../../assets/svg/ic-close-big.svg';
import { IGeneralMessage } from '../../shared/types/interfaces';

import './MessageBox.scss';

interface MessageBoxProps extends IGeneralMessage{
  onClose: (id: string) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  id,
  text,
  lifeTime,
  onClose
}) => {
  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseMessage();
    }, lifeTime);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseMessage = () => {
    if (messageRef.current) {
      messageRef.current.classList.add('hide');
    }

    setTimeout(() => {
      onClose(id);
    }, 600);
  };

  return (
    <div
      ref={ messageRef }
      className="message-box"
    >
      <p className="message-box__text">
        { text }
      </p>

      <CloseIconBig
        className="message-box__icon"
        onClick={ handleCloseMessage } />
    </div>
  );
};

export default MessageBox;
