import React, { useState, useEffect } from "react";
import "./demo1.css";
import "animate.css";
import { CSSTransition } from 'react-transition-group';

export default function CSSTransitionDemo1() {
  const [bouncing, setBouncing] = useState(false);


  function bounce() {
    setBouncing(v => !v);
  }

  return (
    <>
      <button onClick={bounce}>Bounce</button>
      <CSSTransition
        in={bouncing}
        onEnter={() => setBouncing(false)}
      >
        <div
          className={ `target ${bouncing ? 'bounce animated' : ''}` }>
        </div>
      </CSSTransition>
    </>
  )
}


