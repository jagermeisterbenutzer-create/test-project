import React, { createContext, useState } from 'react';

export const GameSettingsContext = createContext();

export const GameSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    boardSize: 20,
    cellSize: 25,
    initialSpeed: 150,
    speedIncrement: 5,
    minSpeed: 50,
  });

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <GameSettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </GameSettingsContext.Provider>
  );
};