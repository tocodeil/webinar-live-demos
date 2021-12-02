import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Snake from './Snake';

test("Can render a snake", () => {
  const screen = render(<Snake />);
  const header = screen.getByText('Snake Game');
  expect(header).toBeInTheDocument();
});

test("Can find header with querySelector (but don't do that)", () => {
  const screen = render(<Snake />);
  const header = screen.container.querySelector('h1');
  expect(header).toBeInTheDocument();
});

test("Snake position is painted blue", () => {
  const screen = render(<Snake />);
  const center = screen.getByTestId('cell-25,25');
  expect(center).toHaveStyle('background: blue');
});

test("Snake position is painted blue", () => {
  jest.useFakeTimers();

  const screen = render(<Snake />);

  act(() => {
    jest.advanceTimersByTime(200);
  });

  const c1 = screen.getByTestId('cell-25,25');
  expect(c1).toHaveStyle('background: blue');

  const c2 = screen.getByTestId('cell-24,25');
  expect(c2).toHaveStyle('background: blue');

  jest.useRealTimers();
});

// How would you fix it???
test("Snake moves right", () => {
  jest.useFakeTimers();

  const screen = render(<Snake />);
  userEvent.type(screen.container, '{arrowleft}');

  act(() => {
    jest.advanceTimersByTime(200);
  });

  const c1 = screen.getByTestId('cell-25,25');
  expect(c1).toHaveStyle('background: blue');

  const c2 = screen.getByTestId('cell-25,24');
  expect(c2).toHaveStyle('background: blue');

  jest.useRealTimers();
});





