import { useState } from 'react';

export default function SearchList(props) {
  const { items } = props;
  const [search, setSearch] = useState('');
  return (
    <div>
      <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} />
      <ul>
        {items.filter(item => item.indexOf(search) >= 0).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

