import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./demo3.css";

export default function CSSTransitionDemo1() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  function toggleDrawer() {
    setDrawerOpen(v => !v);
  }

  return (
    <div className="container">
      <AnimatePresence>
        {drawerOpen && <motion.div
          className={`sidebar ${drawerOpen ? 'open' : 'close'} `}
          animate={{marginLeft: '0px'}}
          exit={{ marginLeft: '-300px' }}
          initial={{ marginLeft: '-300px' }}
        >
          <p>I'm some text in the sidebar</p>
          <img src="https://picsum.photos/id/237/200/300"/>
        </motion.div>}
      </AnimatePresence>
      <div className="main">
        <p>Use the button below to open / close the drawer</p>
        <button onClick={toggleDrawer}>Toggle Drawer</button>
      </div>
    </div>
  )
}