import React, { useState, useEffect } from "react";
import "./demo1.css";
import { CSSTransition } from 'react-transition-group';


export default function CSSTransitionDemo1() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  function toggleDrawer() {
    setDrawerOpen(v => !v);
  }

  return (
    <div className="container">
      <CSSTransition
        in={drawerOpen}
        timeout={300}
        classNames="sidebar"
        onEnter={() => console.log('Element visible')}
        onExited={() => console.log('Element invisible')}
      >

        <div className={"sidebar"}>
          <p>I'm some text in the sidebar</p>
          <img src="https://picsum.photos/id/237/200/300"/>
        </div>
      </CSSTransition>

      <div className="main">
        <p>Use the button below to open / close the drawer</p>
        <button onClick={toggleDrawer}>Toggle Drawer</button>
      </div>
    </div>
  )
}