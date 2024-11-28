import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CircuitMap from './components/CircuitMap';
import './Layout.css';

const Header = () => (
  <header className="header">
    <h1 className="header-title">
      Formula-1 statistics
    </h1>
    <nav className="header-menu">
      <ul className="menu-list">
        <li><Link to="/circuits">Circuit map</Link></li>
        <li><Link to="/drivers">Drivers points</Link></li>
        <li><Link to="/teams">Teams points</Link></li>
      </ul>
    </nav>
  </header>
);

const Sidebar = () => (
  <aside className="sidebar">
    <div>
      <p>A project for Lappeenranta-Lahti University of Technology LUT, Fullstack course, autumn 2024.</p>
      <p>Uses public API <a href="https://ergast.com/mrd/" target="_blank" rel="noreferrer">by Ergast</a>.</p>
      <p>Source code <a href="https://github.com/elidare/elidare-f1-statistics/" target="_blank" rel="noreferrer">at github.</a></p>
      <p>(c) Elena Tishkovskaya</p>
    </div>
  </aside>
);

const Drivers = () => <div>Drivers points</div> // TODO components
const Teams = () => <div>Teams points</div>

const Layout = () => (
  <Router>
    <div className="layout">
      <Header />
      <div className="main">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<CircuitMap />} />
            <Route path="/circuits" element={<CircuitMap />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/teams" element={<Teams />} />
          </Routes>
        </div>
      </div>
    </div>
  </Router>
);

export default Layout;