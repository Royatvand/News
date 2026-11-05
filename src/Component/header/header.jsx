import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import styles from './header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <nav aria-label="Main navigation">
        <ul>
          <li>
            <Link to="/"><FaHome /> <span>Home</span></Link>
          </li>
          <li>
            <Link to="/about"><FaInfoCircle /> <span>About</span></Link>
          </li>
          <li>
            <Link to="/contact"><FaEnvelope /> <span>Contact</span></Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
