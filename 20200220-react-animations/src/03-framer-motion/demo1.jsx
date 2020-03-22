import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./demo1.css";

export default function Demo() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button onClick={() => setVisible(v => !v)}>
        Toggle Div
      </button>

      <div className={"container"}>
          <AnimatePresence>
            {visible &&
            <motion.div
              animate={{ x: [50, -100, 0] }}
              exit={{scale: 0.2 }}
            />
            }
          </AnimatePresence>

      </div>
    </>
  )
}
