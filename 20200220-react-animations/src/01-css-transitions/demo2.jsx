import React, { useState, useEffect } from "react";
import "./demo2.css";

export default function CSSTransitionDemo1() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  function toggleDrawer() {
    setDrawerOpen(v => !v);
  }

  return (
    <div className="container">
      {drawerOpen &&
        <div className={`sidebar ${drawerOpen ? 'open' : 'close'} `} >
          <p>I'm some text in the sidebar</p>
          <img src="https://picsum.photos/id/237/200/300"/>
        </div>
      }
      <div className="main">
        <p>Use the button below to open / close the drawer</p>
        <button onClick={toggleDrawer}>Toggle Drawer</button>
      </div>
    </div>
  )
}