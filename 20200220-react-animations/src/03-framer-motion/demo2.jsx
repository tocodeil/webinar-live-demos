import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

let nextId = 0;

export default function Demo() {
  const [items, setItems] = useState([]);

  function addItem() {
    setItems([...items, { id: nextId, text: `Item ${nextId}`}]);
    nextId += 1;
  }

  function deleteItem(id) {
    setItems(items.filter(item => item.id !== id));
  }

  return (
    <ul className={"items"}>
      <button onClick={addItem}>Add Item</button>
        <AnimatePresence>
          {items.map((item) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, color: 'red' }}
              transition={{ duration: 0.2 }}
            >
              <button onClick={() => deleteItem(item.id)}>x</button>
              {item.text}
            </motion.li>
          ))}
        </AnimatePresence>
    </ul>
  )
}