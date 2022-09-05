import GradientGenerator from './components/GradientGenerator';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MessageContainer from './components/MessageContainer';


const App = () => {

  const [messages, setMessages] = useState([]);

  const addNewMessage = (newMessage) => {
    const newMessageArray = [
      ...messages,
      {
        lifeTime: 3000,
        id: uuidv4(),
        ...newMessage,
      }
    ];

    setMessages(newMessageArray);
  };

  const handleRemoveMessage = (messageId) => {
    setMessages((prevState => prevState.filter((message) => message.id !== messageId)));
  };

  return (
    <>
      <GradientGenerator addNewMessage={addNewMessage} />

      <MessageContainer
        messages={messages}
        handleRemoveMessage={handleRemoveMessage}
      />
    </>
  );
}

export default App;
