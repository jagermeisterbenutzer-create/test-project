const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 480;
const PLAYER_SPEED = 4;

const currentDirectionEl = document.getElementById('current-direction');
const mazeCanvas = document.getElementById('maze-layer');
const spriteCanvas = document.getElementById('sprite-layer');

const mazeCtx = mazeCanvas.getContext('2d');
const spriteCtx = spriteCanvas.getContext('2d');

const player = {
  x: CANVAS_WIDTH / 2 - 20,
  y: CANVAS_HEIGHT / 2 - 10,
  size: 32,
  direction: 'right',
};

const directionVectors = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

function renderMaze() {
  mazeCtx.fillStyle = '#050814';
  mazeCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  mazeCtx.lineWidth = 4;
  mazeCtx.strokeStyle = '#1d52ff';

  for (let x = 20; x < CANVAS_WIDTH; x += 80) {
    mazeCtx.beginPath();
    mazeCtx.moveTo(x, 10);
    mazeCtx.lineTo(x, CANVAS_HEIGHT - 10);
    mazeCtx.stroke();
  }

  for (let y = 20; y < CANVAS_HEIGHT; y += 80) {
    mazeCtx.beginPath();
    mazeCtx.moveTo(10, y);
    mazeCtx.lineTo(CANVAS_WIDTH - 10, y);
    mazeCtx.stroke();
  }
}

function clearSprites() {
  spriteCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function renderPlayer() {
  const { x, y, size } = player;
  spriteCtx.fillStyle = '#ffd95e';
  spriteCtx.beginPath();
  spriteCtx.arc(x, y, size / 2, 0.25 * Math.PI, 1.75 * Math.PI);
  spriteCtx.lineTo(x, y);
  spriteCtx.fill();
}

function updateStatus() {
  currentDirectionEl.textContent = player.direction;
}

function movePlayer(deltaX, deltaY) {
  const radius = player.size / 2;
  player.x = Math.max(radius, Math.min(CANVAS_WIDTH - radius, player.x + deltaX));
  player.y = Math.max(radius, Math.min(CANVAS_HEIGHT - radius, player.y + deltaY));
}

function handleInput(direction) {
  player.direction = direction;
  const vector = directionVectors[direction];
  movePlayer(vector.x * PLAYER_SPEED, vector.y * PLAYER_SPEED);
  updateStatus();
}

window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  switch (key) {
    case 'arrowup':
    case 'w':
      handleInput('up');
      break;
    case 'arrowdown':
    case 's':
      handleInput('down');
      break;
    case 'arrowleft':
    case 'a':
      handleInput('left');
      break;
    case 'arrowright':
    case 'd':
      handleInput('right');
      break;
    default:
      break;
  }
});

function animate() {
  clearSprites();
  renderPlayer();
  requestAnimationFrame(animate);
}

function initialize() {
  renderMaze();
  updateStatus();
  requestAnimationFrame(animate);
}

initialize();
