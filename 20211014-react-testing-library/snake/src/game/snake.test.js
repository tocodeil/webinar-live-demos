// jest
// create-react-app => jest + react-testing-library

import { snake, apple, tick, restart } from './snake';

test("that we can test", () => {
  restart();
  expect(1).toEqual(1);
});

test("snake starts at (0, 0)", () => {
  restart();
  expect(snake.pos[0]).toEqual([0, 0]);
});

test("snake moves up after tick", () => {
  restart();
  tick();
  expect(snake.pos[0]).toEqual([0, 1]);
});
