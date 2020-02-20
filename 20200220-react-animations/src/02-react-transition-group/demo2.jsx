import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import "./demo2.css";

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
        <TransitionGroup>
        {items.map((item) => (
          <CSSTransition
            key={item.id}
            timeout={500}
            classNames={"item"}
          >
            <li key={item.id}>
              <button onClick={() => deleteItem(item.id)}>x</button>
              {item.text}
            </li>
          </CSSTransition>
        ))}
        </TransitionGroup>
    </ul>
  )
}