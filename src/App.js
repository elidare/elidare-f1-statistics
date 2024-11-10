import './App.css';
import CircuitMap from './components/CircuitMap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Formula-1 statistics
        </h1>
        <p>
          A project for Lappeenranta-Lahti University of Technology LUT, Fullstack course, autumn 2024.<br/>
          Uses public API <a href="https://ergast.com/mrd/" target="_blank">by Ergast</a>.<br/>
          Source code <a href="https://github.com/elidare/elidare-f1-statistics/" target="_blank">at github.</a>
        </p>
      </header>
      <CircuitMap />
    </div>
  );
}

export default App;
