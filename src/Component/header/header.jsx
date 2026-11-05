import styles from './header.module.css';

function Header () {
  return (
    <div className={styles.header}>

      <ul>
        <li>خانه</li>
        <li>درباره ما </li>
        <li>تماس با ما</li>
        <li>خدمات</li>
      </ul>
    </div>
  )

}

export default Header;