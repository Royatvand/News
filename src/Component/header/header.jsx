
import styles from './header.module.css';
import {Link} from 'react-router-dom'
function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li><Link to="/">خانه</Link></li>
        <li><Link to="/about">درباره ما</Link></li>
        <li><Link to="/contact">تماس با ما</Link></li>
      </ul>
    </div>
  );
}

export default Header;