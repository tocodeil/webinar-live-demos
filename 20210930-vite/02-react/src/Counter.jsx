import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>

      count is: {count}

      <button type="button" onClick={() => setCount((count) => count + 1)}>
        +
      </button>
      <button type="button" onClick={() => setCount((count) => count - 1)}>
        -
      </button>
    </div>
  );
}

