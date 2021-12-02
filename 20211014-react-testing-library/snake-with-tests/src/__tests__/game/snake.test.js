import createSnake from '../../game/snake';

test('snake starts at 0,0', () => {
  const { snake, apple, tick } = createSnake();
  expect(snake.pos[0]).toEqual([0, 0]);
});

test("there's an apple somewhere on the page", () => {
  const { snake, apple, tick } = createSnake();

  expect(apple.pos[0]).toBeGreaterThanOrEqual(-25);
  expect(apple.pos[0]).toBeLessThanOrEqual(25);
  expect(apple.pos[1]).toBeGreaterThanOrEqual(-25);
  expect(apple.pos[1]).toBeLessThanOrEqual(25);
});

test("Snake initially goes up", () => {
  const { snake, apple, tick } = createSnake();

  tick();
  expect(snake.pos[0]).toEqual([0, 1]);
});

test("Snake can catch the apple and grow", () => {
  const { snake, apple, tick } = createSnake();

  apple.pos = [0, 1];

  const initialSnakeSize = snake.size;
  for (let i=0; i < snake.size; i++) {
    tick();
  }

  expect(snake.size).toEqual(initialSnakeSize + 1);
});

test("Snake grows up to its size", () => {
  const { snake, apple, tick } = createSnake();

  const initialSnakeSize = snake.size;
  snake.size += 5;

  for (let i=0; i < snake.size; i++) {
    tick();
  }

  expect(snake.pos.length).toEqual(snake.size);
});
