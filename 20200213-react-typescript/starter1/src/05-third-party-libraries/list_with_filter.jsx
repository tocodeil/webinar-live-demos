import React, { useState } from "react";
import _ from "lodash";

export default function ListWithFilter(props) {
  const { items } = props;
  const [filter, setFilter] = useState('');
  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <ul>
        {_.filter(items, item => item.includes(filter)).map(item => (
          <li>{item}</li>
        ))}
      </ul>

    </div>
  )
}
