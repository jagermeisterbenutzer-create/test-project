import SnakeGame from './SnakeGame';
import './App.css';
import { GameSettingsProvider } from './GameSettingsContext';
import SettingsMenu from './SettingsMenu';

function App() {
  return (
    <GameSettingsProvider>
      <SettingsMenu />
      <SnakeGame />
    </GameSettingsProvider>
  );
}

export default App;