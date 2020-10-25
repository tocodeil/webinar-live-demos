import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';

const GameContext = React.createContext({ totalScore: 0, gameIndex: 0 });

function ControlPanel(props) {
  const { reset, totalScore } = useContext(GameContext);

  return (
    <div className="control-panel">
      <p>
        Total Score: {totalScore}
        <button onClick={reset}>Reset Everything</button>
      </p>
    </div>
  );
}

function RedSpotter(props) {
  const [score, setScore] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState(_.random(4));
  const { addScore, gameIndex } = useContext(GameContext);

  useEffect(function() {
    setScore(0);
    setWinnerIndex(0);
  }, [gameIndex]);

  function handleClick(i) {
    if (i === winnerIndex) {
      setWinnerIndex(_.random(4));
      setScore(s => s + 5);
      addScore(5);
    } else {
      setScore(s => s - 2);
      addScore(-2);
    }
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
}

function App() {
  const [totalScore, setTotalScore] = useState(0);
  const [gameIndex, setGameIndex] = useState(Math.random());

  function reset() {
    setGameIndex(Math.random());
    setTotalScore(0);
  }

  function addScore(s) {
    setTotalScore(score => score + s);
  }

  const globalData = {
    totalScore,
    gameIndex,
    reset,
    addScore,
  };

  return (
    <div className="App">
      <GameContext.Provider value={globalData}>
        <ControlPanel />
        <RedSpotter />
        <RedSpotter />
        <RedSpotter />
        <RedSpotter />
      </GameContext.Provider>
    </div>
  );
}

export default App;
