import React, { useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CSSTransitionDemo1() {
  const [isRound, setIsRound] = useState(false);

  function toggleRound() {
    setIsRound(v => !v);
  }

  const style = {
    width: '100px',
    height: '100px',
    background: 'url(https://robohash.org/ynon?set=set4&size=100x100)  blue',
  };

  return (
    <motion.div
      style={style}
      onClick={toggleRound}
      animate={{ borderRadius: isRound ? '50px' : '0px' }}
    >
    </motion.div>
  )
}