import SnakeGame from './SnakeGame';
import './App.css';
import { GameSettingsProvider } from './GameSettingsContext';
import SettingsMenu from './SettingsMenu';

function App() {
  return (
    <GameSettingsProvider>
      <div className="app-shell">
        <section className="app-hero">
          <p className="app-kicker">Retro Arcade Tribute</p>
          <h1 className="app-title">Snake Kong</h1>
          <p className="app-subtitle">
            A polished Snake experience with chunky pixels, neon lighting, and energetic sound cues.
          </p>
        </section>
        <SettingsMenu />
        <SnakeGame />
      </div>
    </GameSettingsProvider>
  );
}

export default App;
