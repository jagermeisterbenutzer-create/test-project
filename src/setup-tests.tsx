import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../htmlTemplate/src/App';

describe('App Integration Tests', () => {
// Removed cleanup function that caused conflicts

  test('renders the settings menu and allows changes', () => {
    render(<App />);

    // Verify the settings menu is present
    expect(screen.getByText(/Game Settings/i)).toBeInTheDocument();

    // Adjust Board Size
    const boardSizeInput = screen.getByLabelText(/Board Size:/i);
    fireEvent.change(boardSizeInput, { target: { value: '30' } });
    expect(boardSizeInput.value).toBe('30');
  });

  test('renders Snake Game and tracks dynamic changes', () => {
    render(<App />);

    // Verify Snake Game is rendered
    expect(screen.getByText(/Snake Game/i)).toBeInTheDocument();

    // Adjust speed setting
    const speedInput = screen.getByLabelText(/Initial Speed:/i);
    fireEvent.change(speedInput, { target: { value: '100' } });
    expect(speedInput.value).toBe('100');
  });
});