import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import GradientGenerator from './components/GradientGenerator';
import MessageContainer from './components/MessageContainer';
import { GeneralMessage } from './shared/types/interfaces';

const App = (): JSX.Element => {
  const [messages, setMessages] = useState<GeneralMessage[]>([]);

  const addNewMessage = (newMessage) => {
    const newMessageArray = [
      ...messages,
      {
        lifeTime: 3000,
        id: uuidv4(),
        ...newMessage,
      },
    ];

    setMessages(newMessageArray);
  };

  const handleRemoveMessage = (messageId) => {
    setMessages((prevState) => prevState.filter((message) => message.id !== messageId));
  };

  return (
    <>
      <GradientGenerator addNewMessage={ addNewMessage } />

      <MessageContainer
        messages={ messages }
        handleRemoveMessage={ handleRemoveMessage } />
    </>
  );
};

export default App;
