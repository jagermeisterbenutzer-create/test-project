import { useState, useEffect, useCallback, useRef } from 'react';
import './SnakeGame.css';

const BOARD_SIZE = 20;
const CELL_SIZE = 25;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;
const MIN_SPEED = 50;

const Direction = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

function getRandomPosition(snake) {
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some((seg) => seg.x === position.x && seg.y === position.y));
  return position;
}

function SnakeGame() {
  const initialSnake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];

  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(() => getRandomPosition(initialSnake));
  const [direction, setDirection] = useState(Direction.RIGHT);
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? Number(saved) : 0;
  });
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const directionRef = useRef(direction);
  const snakeRef = useRef(snake);
  const foodRef = useRef(food);
  const speedRef = useRef(speed);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const resetGame = useCallback(() => {
    const newSnake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    setSnake(newSnake);
    setFood(getRandomPosition(newSnake));
    setDirection(Direction.RIGHT);
    setIsGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsRunning(false);
  }, []);

  const moveSnake = useCallback(() => {
    const currentSnake = snakeRef.current;
    const currentDirection = directionRef.current;
    const currentFood = foodRef.current;

    const head = currentSnake[0];
    const newHead = {
      x: head.x + currentDirection.x,
      y: head.y + currentDirection.y,
    };

    if (
      newHead.x < 0 ||
      newHead.x >= BOARD_SIZE ||
      newHead.y < 0 ||
      newHead.y >= BOARD_SIZE
    ) {
      setIsGameOver(true);
      setIsRunning(false);
      return;
    }

    if (currentSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
      setIsGameOver(true);
      setIsRunning(false);
      return;
    }

    const newSnake = [newHead, ...currentSnake];
    const ate = newHead.x === currentFood.x && newHead.y === currentFood.y;

    if (ate) {
      const newScore = score + 10;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('snakeHighScore', String(newScore));
      }
      setFood(getRandomPosition(newSnake));
      const newSpeed = Math.max(MIN_SPEED, speedRef.current - SPEED_INCREMENT);
      setSpeed(newSpeed);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [score, highScore]);

  useEffect(() => {
    if (!isRunning || isGameOver) return;

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [isRunning, isGameOver, speed, moveSnake]);

  const handleKeyDown = useCallback(
    (e) => {
      if (isGameOver) return;

      const current = directionRef.current;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          if (current !== Direction.DOWN) {
            setDirection(Direction.UP);
            if (!isRunning) setIsRunning(true);
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          if (current !== Direction.UP) {
            setDirection(Direction.DOWN);
            if (!isRunning) setIsRunning(true);
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          if (current !== Direction.RIGHT) {
            setDirection(Direction.LEFT);
            if (!isRunning) setIsRunning(true);
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          if (current !== Direction.LEFT) {
            setDirection(Direction.RIGHT);
            if (!isRunning) setIsRunning(true);
          }
          break;
        case ' ':
          e.preventDefault();
          if (isGameOver) {
            resetGame();
          } else {
            setIsRunning((prev) => !prev);
          }
          break;
        default:
          break;
      }
    },
    [isRunning, isGameOver, resetGame]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  function renderBoard() {
    const cells = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const isSnakeHead = snake[0].x === x && snake[0].y === y;
        const isSnakeBody = snake.slice(1).some((seg) => seg.x === x && seg.y === y);
        const isFood = food.x === x && food.y === y;

        let className = 'snake-cell';
        if (isSnakeHead) className += ' snake-head';
        else if (isSnakeBody) className += ' snake-body';
        if (isFood) className += ' snake-food';

        cells.push(
          <div
            key={`${x}-${y}`}
            className={className}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          />
        );
      }
    }
    return cells;
  }

  return (
    <div className="snake-game">
      <h1 className="snake-title">Snake Game</h1>
      <div className="snake-scoreboard">
        <span className="snake-score">Score: {score}</span>
        <span className="snake-high-score">Best: {highScore}</span>
      </div>
      <div
        className="snake-board"
        style={{
          width: BOARD_SIZE * CELL_SIZE,
          height: BOARD_SIZE * CELL_SIZE,
        }}
      >
        {renderBoard()}
        {!isRunning && !isGameOver && score === 0 && (
          <div className="snake-overlay">
            <p>Press any arrow key or WASD to start</p>
            <p className="snake-hint">Space to pause</p>
          </div>
        )}
        {!isRunning && !isGameOver && score > 0 && (
          <div className="snake-overlay">
            <p>Paused</p>
            <p className="snake-hint">Space to resume</p>
          </div>
        )}
        {isGameOver && (
          <div className="snake-overlay snake-game-over">
            <p>Game Over!</p>
            <p className="snake-final-score">Score: {score}</p>
            <button className="snake-restart-btn" onClick={resetGame}>
              Play Again
            </button>
            <p className="snake-hint">or press Space</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SnakeGame;
