import React, { useContext } from 'react';
import { GameSettingsContext } from './GameSettingsContext';

const SettingsMenu = () => {
  const { settings, updateSetting } = useContext(GameSettingsContext);

  return (
    <div className="settings-menu">
      <h2>Game Settings</h2>
      <label>
        Board Size:
        <input
          type="number"
          value={settings.boardSize}
          onChange={(e) => updateSetting('boardSize', parseInt(e.target.value, 10))}
        />
      </label>
      <label>
        Cell Size:
        <input
          type="number"
          value={settings.cellSize}
          onChange={(e) => updateSetting('cellSize', parseInt(e.target.value, 10))}
        />
      </label>
      <label>
        Initial Speed:
        <input
          type="number"
          value={settings.initialSpeed}
          onChange={(e) => updateSetting('initialSpeed', parseInt(e.target.value, 10))}
        />
      </label>
      <label>
        Speed Increment:
        <input
          type="number"
          value={settings.speedIncrement}
          onChange={(e) => updateSetting('speedIncrement', parseInt(e.target.value, 10))}
        />
      </label>
      <label>
        Min Speed:
        <input
          type="number"
          value={settings.minSpeed}
          onChange={(e) => updateSetting('minSpeed', parseInt(e.target.value, 10))}
        />
      </label>
    </div>
  );
};

export default SettingsMenu;