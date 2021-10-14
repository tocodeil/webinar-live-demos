import { useState, useEffect } from 'react';
import _ from 'lodash';

function colorOf(row, col, snakeData, appleData) {
  if (snakeData.has(`${row},${col}`)) {
    return "blue";
  }

  if (appleData.has(`${row},${col}`)) {
    return "red";
  }

  return "transparent";
}

// Translates from coord (x, y) to (row, column)
function translate(coord) {
  return `${50 - (coord[1] + 25)},${coord[0] + 25}`;
}

function getAppleData(apple) {
  return new Set([translate(apple.pos)]);
}

function getSnakeData(snake) {
  return new Set(snake.pos.map(translate));
}

export default function Snake(props) {
  const { snake, apple, tick } = props;
  const [snakeData, setSnakeData] = useState(getSnakeData(snake));
  const [appleData, setAppleData] = useState(getAppleData(apple));

  useEffect(function() {
    const clock = setInterval(function() {
      tick();
      setSnakeData(getSnakeData(snake));
      setAppleData(getAppleData(apple));
    }, 200);

    return function() {
      clearInterval(clock);
    }
  }, [])

  return (
    _.range(50).map(row => (
      <div className="row" key={`row-${row}`}>
        {
          _.range(50).map(col => (
            <div
              data-testid={`${row},${col}`}
              className="col"
              style={{ background: colorOf(row, col, snakeData, appleData)}}
              key={`col-${row}-${col}`}
            />
          ))
        }
      </div>
    ))        
  )
}
