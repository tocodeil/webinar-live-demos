import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Snake from './Snake';
import createSnake from './game/snake';

function App() {
  const {snake, apple, tick, handleKeyDown, restart} = createSnake();
  const [restartCount, setRestartCount] = useState(0);

  function handleRestart() {
    setRestartCount(x => x + 1);
  }

  return (
    <div onKeyDown={(ev) => handleKeyDown(ev)} tabIndex={0} >
      <button onClick={handleRestart}>New Game</button>
      <Snake snake={snake} apple={apple} tick={tick} key={restartCount} />
    </div>
  )
}

export default App
