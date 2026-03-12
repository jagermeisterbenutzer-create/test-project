import React, { createContext, useState } from 'react';

export const GameSettingsContext = createContext();

const DEFAULT_SETTINGS = {
  boardSize: 20,
  cellSize: 25,
  initialSpeed: 150,
  speedIncrement: 5,
  minSpeed: 50,
};

export const GameSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => ({ ...DEFAULT_SETTINGS }));

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => setSettings({ ...DEFAULT_SETTINGS });

  return (
    <GameSettingsContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </GameSettingsContext.Provider>
  );
};
