import React, { useState } from 'react';

export default function TextBoxes(props) {
  const [text, setText] = useState('');
  function handleChange(e) {
      setText(e.target.value);
  }

  return (
    <div>
      <input type="input" value={text} onChange={handleChange} />
      <input type="input" value={text} onChange={handleChange} />
      <input type="input" value={text} onChange={handleChange} />
      <input type="input" value={text} onChange={handleChange} />
      <input type="input" value={text} onChange={handleChange} />
    </div>
  )
}