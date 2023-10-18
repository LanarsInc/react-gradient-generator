import React, { useState, useLayoutEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from '@components/Header';
import GradientGenerator from '@components/GradientGenerator';
import MessageContainer from '@components/MessageContainer';
import { GeneralMessage } from '@shared/types/interfaces';
import { ThemeMode, themeModeLocalStorageKey } from '@shared/constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<GeneralMessage[]>([]);
  const [activeThemeMode, setActiveThemeMode] = useState<ThemeMode | null>(
    null
  );

  const setThemeMode = (modeName: ThemeMode) => {
    document.documentElement.setAttribute('data-theme', modeName);
    localStorage.setItem(themeModeLocalStorageKey, modeName);
    setActiveThemeMode(modeName);
  };

  useLayoutEffect(() => {
    const themeFromLocalStorage = localStorage.getItem(
      themeModeLocalStorageKey
    ) as ThemeMode;
    const themeFromSystemPreference = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
      ? ThemeMode.DARK
      : ThemeMode.LIGHT;

    setThemeMode(themeFromLocalStorage || themeFromSystemPreference);
  }, []);

  const addNewMessage = (newMessage: Omit<GeneralMessage, 'id'>) => {
    const newMessageArray = [
      ...messages,
      {
        id: uuidv4(),
        ...newMessage,
      },
    ];

    setMessages(newMessageArray);
  };

  const handleRemoveMessage = (messageId: string) => {
    setMessages((prevState) =>
      prevState.filter((message) => message.id !== messageId)
    );
  };

  const toggleThemeMode = () => {
    return setThemeMode(
      document.documentElement.getAttribute('data-theme') === ThemeMode.LIGHT
        ? ThemeMode.DARK
        : ThemeMode.LIGHT
    );
  };

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
