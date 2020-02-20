import React, { useState, useEffect } from "react";
import "./demo1.css";

export default function CSSTransitionDemo1() {
  const [isRound, toggleRound] = useToggle();
  const [hasFrame, toggleFrame] = useToggle();
  const [isBw, toggleBw] = useToggle();

  return (
    <>
      <button onClick={toggleRound}>Round</button>
      <button onClick={toggleFrame}>Frame</button>
      <button onClick={toggleBw}>Black & White</button>
      <div
        className={
          `target
           ${isRound ? ' round' : ''}
           ${hasFrame ? ' frame': ''}
           ${isBw ? ' bw' : ''}
          `
        }>
      </div>
    </>
  )
}

function useToggle(initialState = false) {
  const [val, setVal] = useState(initialState);
  function toggle() {
    setVal(v => !v);
  }
  return [val, toggle];
}
