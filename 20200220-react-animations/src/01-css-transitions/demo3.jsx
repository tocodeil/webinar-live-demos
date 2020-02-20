import React, { useState, useEffect } from "react";
import "./demo1.css";
import "animate.css";

export default function CSSTransitionDemo1() {
  const [bouncing, setBouncing] = useState(false);

  function bounce() {
    setBouncing(v => !v);
  }

  return (
    <>
      <button onClick={bounce}>Bounce</button>
      <div
        className={ `target ${bouncing ? 'bounce animated' : ''}` }>
      </div>
    </>
  )
}


