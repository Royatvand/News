
import { Link } from 'react-router-dom';
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import styles from './404.module.css';

function NotFound() {
  return (
    <div className={styles.notFound}>

      {/* افکت‌های پس‌زمینه */}
      <div className={styles.glow}></div>
      <div className={styles.stars}></div>

      <div className={styles.content}>

        <span className={styles.label}>OOPS! SOMETHING WENT WRONG</span>

        {/* عدد بزرگ 404 */}
        <h1 className={styles.number}>404</h1>

        <h2>Page Not Found</h2>

        <p>
          Looks like this page has disappeared into space.
          Don't worry, let's get you back home.
        </p>

        {/* دکمه بازگشت */}
        <Link to="/" className={styles.homeButton}>
          <FaHome />
          <span>Back to Home</span>
          <FaArrowLeft />
        </Link>

        <span className={styles.footerText}>
          NEWS — EXPLORE SOMETHING NEW
        </span>

      </div>
    </div>
  );
}

export default NotFound;
