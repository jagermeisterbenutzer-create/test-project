# Snake Game

A Snake game built with React 19 and Vite 7, with a small Express backend stub.

**Live demo:** https://jagermeisterbenutzer-create.github.io/test-project/

---

## Prerequisites

- Node.js (v18 or later)
- npm

## Setup

Frontend:
```bash
cd htmlTemplate
npm install
```

Backend (optional):
```bash
cd backend
npm install
```

## Development

Frontend:
```bash
cd htmlTemplate
npm run dev
```

Opens a dev server at http://localhost:5173

Backend (optional):
```bash
cd backend
npm run dev
```

## Production Build

```bash
cd htmlTemplate
npm run build
npm run preview
```

Built files are output to `htmlTemplate/dist/`.

## Deployment

The project deploys automatically to GitHub Pages via GitHub Actions on every push to `main`.

To enable deployment:
1. Go to repository **Settings > Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` -- the workflow at `.github/workflows/deploy.yml` will build and deploy

## Project Structure

```
htmlTemplate/           # React frontend (Snake Game)
  src/
    App.jsx             # Root component
    SnakeGame.jsx       # Game logic and rendering
    GameSettingsContext.jsx  # Settings state (board size, speed, etc.)
    SettingsMenu.jsx    # Settings UI
backend/                # Express.js API stub
```

## Testing

```bash
cd htmlTemplate
npm test
```

## Linting

```bash
cd htmlTemplate
npm run lint
```
