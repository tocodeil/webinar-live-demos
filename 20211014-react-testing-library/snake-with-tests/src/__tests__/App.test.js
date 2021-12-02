import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('The snake moves', () => {
  const screen = render(<App />);
  act(() => {
    jest.advanceTimersByTime(500);
  });
  expect(screen.getByTestId('23,25')).toHaveStyle('background: blue');
});

test('It starts a new game', () => {
  const screen = render(<App />);
  act(() => {
    jest.advanceTimersByTime(500);
    userEvent.click(screen.getByText('New Game'));
  });
  expect(screen.getByTestId('23,25')).toHaveStyle('background: transparent');
  expect(screen.getByTestId('25,25')).toHaveStyle('background: blue');
});


