import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders settings menu and adjusts settings', () => {
  render(<App />);

  // Check that the settings menu is rendered
  expect(screen.getByText(/Game Settings/i)).toBeInTheDocument();

  // Adjust board size
  const boardSizeInput = screen.getByLabelText(/Board Size:/i);
  fireEvent.change(boardSizeInput, { target: { value: '25' } });
  expect(boardSizeInput.value).toBe('25');

  // Adjust cell size
  const cellSizeInput = screen.getByLabelText(/Cell Size:/i);
  fireEvent.change(cellSizeInput, { target: { value: '30' } });
  expect(cellSizeInput.value).toBe('30');
});

test('renders SnakeGame and adjusts dynamically', () => {
  render(<App />);

  // Check that the snake game is rendered
  expect(screen.getByText(/Snake Game/i)).toBeInTheDocument();

  // Interact with settings and observe changes
  const speedInput = screen.getByLabelText(/Initial Speed:/i);
  fireEvent.change(speedInput, { target: { value: '200' } });
  expect(speedInput.value).toBe('200');
});