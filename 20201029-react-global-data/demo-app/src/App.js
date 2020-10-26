import React, { useState, useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store, { actions } from './redux/store';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';

function ControlPanel(props) {
  const dispatch = useDispatch();
  const totalScore = useSelector(state => state.totalScore);

  function reset() {
    dispatch(actions.reset());
  }

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
  const dispatch = useDispatch();
  const [score, setScore] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState(_.random(4));
  const gameIndex = useSelector(state => state.gameIndex);
  console.count("Render");

  useEffect(function() {
    setScore(0);
    setWinnerIndex(0);
  }, [gameIndex]);

  function handleClick(i) {
    let scoreChange = -2;

    if (i === winnerIndex) {
      setWinnerIndex(_.random(4));
      scoreChange = 5;
    }

    setScore(s => s + scoreChange);
    dispatch(actions.addScore(scoreChange));
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
  return (
    <Provider store={store}>
      <div className="App">
        <ControlPanel />
        <RedSpotter />
        <RedSpotter />
        <RedSpotter />
        <RedSpotter />
      </div>
    </Provider>
  );
}

export default App;
