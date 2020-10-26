import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';

function ControlPanel(props) {
  function reset() {
  }

  return (
    <div className="control-panel">
      <p>
        Total Score: {0}
        <button onClick={reset}>Reset Everything</button>
      </p>
    </div>
  );
}

function RedSpotter(props) {
  const [score, setScore] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState(_.random(4));
  const scoreChange = -2;

  function handleClick(i) {
    if (i === winnerIndex) {
      setWinnerIndex(_.random(4));
      scoreChange = 5;
    }
  }

  setScore(s => s + scoreChange);

  return (
    <div className="game">
      <p>Score: {score}</p>
      {_.range(5).map(i => (
        <div
          className={`box ${winnerIndex === i ? "winner" : ""}`}
          onClick={() => handleClick(i)}
        >
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <ControlPanel />
      <RedSpotter />
      <RedSpotter />
      <RedSpotter />
      <RedSpotter />
    </div>
  );
}

export default App;
