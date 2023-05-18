import React, { useState, useLayoutEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import GradientGenerator from './components/GradientGenerator';
import MessageContainer from './components/MessageContainer';
import { GeneralMessage } from './shared/types/interfaces';
import { ThemeMode, themeModeLocalStorageKey } from './shared/constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<GeneralMessage[]>([]);
  const [activeThemeMode, setActiveThemeMode] = useState(null);

  const addNewMessage = (newMessage) => {
    const newMessageArray = [
      ...messages,
      {
        id: uuidv4(),
        ...newMessage,
      },
    ];

    setMessages(newMessageArray);
  };

  const handleRemoveMessage = (messageId) => {
    setMessages((prevState) =>
      prevState.filter((message) => message.id !== messageId)
    );
  };

  const setThemeMode = (modeName) => {
    document.documentElement.setAttribute('data-theme', modeName);
    localStorage.setItem(themeModeLocalStorageKey, modeName);
    setActiveThemeMode(modeName);
  };

  const toggleThemeMode = () => {
    return setThemeMode(
      document.documentElement.getAttribute('data-theme') === ThemeMode.LIGHT
        ? ThemeMode.DARK
        : ThemeMode.LIGHT
    );
  };

  useLayoutEffect(() => {
    const themeFromLocalStorage = localStorage.getItem(
      themeModeLocalStorageKey
    );
    const themeFromSystemPreference = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
      ? ThemeMode.DARK
      : ThemeMode.LIGHT;

    if (themeFromLocalStorage) {
      setThemeMode(themeFromLocalStorage);
    } else {
      setThemeMode(themeFromSystemPreference);
    }
  }, []);

  return (
    <main>
      <Header
        activeThemeMode={activeThemeMode}
        toggleThemeMode={toggleThemeMode}
      />

      <GradientGenerator addNewMessage={addNewMessage} />

      <MessageContainer
        messages={messages}
        handleRemoveMessage={handleRemoveMessage}
      />
    </main>
  );
};

export default App;
