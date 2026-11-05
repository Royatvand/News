import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import styles from './header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <nav aria-label="منوی اصلی">
        <ul>
          <li>
            <Link to="/"><FaHome /> <span>خانه</span></Link>
          </li>
          <li>
            <Link to="/about"><FaInfoCircle /> <span>درباره ما</span></Link>
          </li>
          <li>
            <Link to="/contact"><FaEnvelope /> <span>تماس با ما</span></Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
