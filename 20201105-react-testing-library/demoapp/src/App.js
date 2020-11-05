import logo from './logo.svg';
import './App.css';
import Weather from './examples/weather';
import Counter from './examples/counter';

function App() {
  return (
    <div className="App">
      <Counter />
      <Weather city="Tel Aviv" />
      <Weather city="Jerusalem" />
    </div>
  );
}

export default App;
