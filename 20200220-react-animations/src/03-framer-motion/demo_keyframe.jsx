import React, { useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CSSTransitionDemo1() {
  const style = {
    width: '100px',
    height: '100px',
    background: 'url(https://robohash.org/ynon?set=set4&size=100x100)  blue',
  };

  return (
    <motion.div
      style={style}
      animate={{
        y: [0, -10, 5, -5, 2, -4, 0],
        borderRadius: '50px'
      }}
    >
    </motion.div>
  )
}