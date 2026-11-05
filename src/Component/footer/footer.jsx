import { FaGithub, FaTelegramPlane } from 'react-icons/fa';
import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.about}>
          <h2>News</h2>
          <p>Your place to explore the latest stories, ideas, and articles.</p>
        </div>

        <div className={styles.socials}>
          <a href="https://github.com/Royatvand" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
            <span>GitHub</span>
          </a>
          <a href="https://t.me/alovedark" target="_blank" rel="noreferrer" aria-label="Telegram">
            <FaTelegramPlane />
            <span>Telegram</span>
          </a>
        </div>
      </div>
      <p className={styles.copyright}>© {new Date().getFullYear()} News. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
