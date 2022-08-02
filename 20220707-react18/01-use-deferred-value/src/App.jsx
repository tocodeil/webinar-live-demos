import tinycolor from 'tinycolor2';
import { useState, useDeferredValue } from 'react';

function ColorBox(props) {
  const { start, spin, id } = props;
  const color = tinycolor(start).spin(spin).toString();

  return (
    <div
      data-id={id}
      style={{
        width: '50px',
        height: '50px',
        background: color,

        display: 'inline-block',
        margin: '5px',
      }} >{id}</div>
  );
}

function ColorPalette(props) {
  const { start } = props;

  const colors = [];
  for (let i=-360; i < 360; i++) {
    colors.push(
      <ColorBox
        start={start}
        spin={i}
        id={i}
        key={i}
      />
    );
  }
  return colors;
}

export default function ColorSelector() {
  const [ticks, setTicks] = useState(0);
  const [color, setColor] = useState('#000000');
  const dcolor = useDeferredValue(color);

  return (
    <div>
      <button onClick={() => setTicks(v => v + 1)}>Click Me ... {ticks}</button>
      <div>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value) } />
      </div>
      <ColorPalette start={dcolor} />
    </div>
  );
}

