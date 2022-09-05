import React, { useEffect, useRef } from 'react';
import { ReactComponent as CloseIconBig } from './../../assets/svg/ic-close-big.svg';

import './MessageBox.scss';


const MessageBox = ({ id, text, lifeTime, onClose }) => {

  const messageRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseMessage(id);
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
      ref={messageRef}
      className='message-box'
    >
      <p className='message-box__text'>
        {text}
      </p>

      <CloseIconBig
        className='message-box__icon'
        onClick={handleCloseMessage}
      />
    </div>
  );
};

export default MessageBox;
