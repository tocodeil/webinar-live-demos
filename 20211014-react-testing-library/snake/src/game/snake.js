import _ from 'lodash';

export function restart() {
  snake.size = 4;
  snake.pos = [[0, 0]];
  snake.direction = [0, 1];
  apple.pos = [_.random(-25, 25), _.random(-25, 25)];
}

export const snake = {
  pos: [[0, 0]],
  size: 4,
  direction: [1, 0],
}

export const apple = {
  pos: [_.random(-25, 25), _.random(-25, 25)]
}

function collides(pos1, pos2) {
  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
}

export function tick() {
  if (collides(snake.pos[0], apple.pos)) {
    snake.size += 1;
    apple.pos = [_.random(-25, 25), _.random(-25, 25)];
  }

  const snakeHead = snake.pos[0];
  const nextHead = [snakeHead[0] + snake.direction[0], snakeHead[1] + snake.direction[1]];

  if (nextHead[0] > 25) { nextHead[0] = -25; }
  if (nextHead[0] < -25) { nextHead[0] = 25; }
  if (nextHead[1] > 25) { nextHead[1] = -25; } 
  if (nextHead[1] < -25) { nextHead[1] = 25; }

  if (snake.pos.filter(p => collides(p, nextHead)).length > 0) {
    // snake collides with itself
    return restart();
  }

  snake.pos.unshift(nextHead);

  if (snake.pos.length > snake.size) {
    snake.pos.pop();
  }
}

window.addEventListener('keydown', function(ev) {

  if (ev.key === "ArrowDown") {
    snake.direction = [0, -1];
  }

  if (ev.key === "ArrowUp") {
    snake.direction = [0, 1];
  }

  if (ev.key === "ArrowLeft") {
    snake.direction = [-1, 0];
  }

  if (ev.key === "ArrowRight") {
    snake.direction = [1, 0];
  }
});

restart();
