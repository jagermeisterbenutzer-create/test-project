import React, { useContext } from 'react';
import { GameSettingsContext } from './GameSettingsContext';

const SettingsMenu = () => {
  const { settings, updateSetting, resetSettings } = useContext(GameSettingsContext);

  return (
    <div className="settings-menu">
      <h2>Game Settings</h2>
      <label>
        Board Size
        <input
          type="number"
          min="12"
          max="32"
          value={settings.boardSize}
          onChange={(e) => updateSetting('boardSize', parseInt(e.target.value, 10))}
        />
      </label>
      <label>
        Cell Size
        <input
          type="number"
          min="16"
          max="32"
          step="1"
          value={settings.cellSize}
          onChange={(e) => updateSetting('cellSize', parseInt(e.target.value, 10))}
        />
      </label>
      <label>
        Initial Speed (ms)
        <input
          type="number"
          min="80"
          max="220"
          step="5"
          value={settings.initialSpeed}
          onChange={(e) => updateSetting('initialSpeed', parseInt(e.target.value, 10))}
        />
      </label>
      <label>
        Speed Increment
        <input
          type="number"
          min="2"
          max="10"
          step="1"
          value={settings.speedIncrement}
          onChange={(e) => updateSetting('speedIncrement', parseInt(e.target.value, 10))}
        />
      </label>
      <label>
        Min Speed (ms)
        <input
          type="number"
          min="30"
          max="150"
          step="5"
          value={settings.minSpeed}
          onChange={(e) => updateSetting('minSpeed', parseInt(e.target.value, 10))}
        />
      </label>
      <button type="button" className="settings-reset" onClick={resetSettings}>
        Reset to Default
      </button>
    </div>
  );
};

export default SettingsMenu;
