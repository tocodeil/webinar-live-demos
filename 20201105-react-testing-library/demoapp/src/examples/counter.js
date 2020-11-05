import { useEffect, useState } from 'react';

export default function Counter(props) {
  const [val, setVal] = useState(0);
  useEffect(function() {
    const timer = setInterval(() => {
      setVal(v => v + 1);
    }, 1000);

    return function cancel() {
      clearInterval(timer);
    }
  }, []);

  return (<p>Value: {val}</p>);
}

