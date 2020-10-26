import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';
import globalGameData from './mobx/redspotter';
import { observer } from "mobx-react"

const ControlPanel = observer(function ControlPanel(props) {
  function reset() {
    globalGameData.reset();
  }

  return (
    <div className="control-panel">
      <p>
        Total Score: {globalGameData.totalScore}
        <button onClick={reset}>Reset Everything</button>
      </p>
    </div>
  );
});

const RedSpotter = observer(function RedSpotter(props) {
  const [score, setScore] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState(_.random(4));
  let scoreChange = -2;

  console.count("Render");

  useEffect(function() {
    setScore(0);
    setWinnerIndex(0);
  }, [globalGameData.gameIndex]);

  function handleClick(i) {
    if (i === winnerIndex) {
      setWinnerIndex(_.random(4));
      scoreChange = 5;
    }
    setScore(s => s + scoreChange);
    globalGameData.addScore(scoreChange);
  }

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
});

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
