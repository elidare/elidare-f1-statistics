import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CircuitMap from './components/CircuitMap';
import DriversStandings from './components/DriversStandings';
import ConstructorsStandings from './components/ConstructorsStandings';
import './Layout.css';

const Header = () => (
  <header className="header">
    <h1 className="header-title">
      Formula-1 statistics
    </h1>
    <nav className="header-menu">
      <ul className="menu-list">
        <li><NavLink to="/circuits" className={({ isActive }) => isActive ? 'active' : ''}>Circuit map</NavLink></li>
        <li><NavLink to="/drivers" className={({ isActive }) => isActive ? 'active' : ''}>Drivers points and wins</NavLink></li>
        <li><NavLink to="/constructors" className={({ isActive }) => isActive ? 'active' : ''}>Constructors points and wins</NavLink></li>
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
      <p class="sub">Favicon <a href="https://www.flaticon.com/free-icons/formula-1" title="formula 1 icons">Formula 1 icons created by Assia Benkerroum  - Flaticon</a></p>
    </div>
  </aside>
);

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
            <Route path="/drivers" element={<DriversStandings />} />
            <Route path="/constructors" element={<ConstructorsStandings />} />
          </Routes>
        </div>
      </div>
    </div>
  </Router>
);

export default Layout;
