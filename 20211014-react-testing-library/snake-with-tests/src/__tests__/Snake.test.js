import { render } from '@testing-library/react';
import createSnake from '../game/snake';
import Snake from '../Snake';

test("Snake renders", () => {
  const { snake, apple, tick } = createSnake();
  snake.pos[0] = [0, 0];
  const screen = render(<Snake snake={snake} apple={apple} tick={tick} />);

  expect(screen).not.toBeNull();
});

test("Snake appears in the middle (25, 25)", () => {
  const { snake, apple, tick } = createSnake();
  snake.pos[0] = [0, 0];
  const screen = render(<Snake snake={snake} apple={apple} tick={tick} />);

  const snakeDiv = screen.getByTestId('25,25');
  expect(snakeDiv).toHaveStyle('background: blue');
});

