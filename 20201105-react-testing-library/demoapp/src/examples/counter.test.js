import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Counter from './counter';

// Test Runner: jest

test('starts at 0', () => {
  render(<Counter />);
  expect(screen.getByText("Value: 0")).toBeInTheDocument();
});

test('value increases with time', () => {
  jest.useFakeTimers();
  render(<Counter />);
  act(() => jest.advanceTimersByTime(1000));
  expect(screen.getByText("Value: 1")).toBeInTheDocument();
});
