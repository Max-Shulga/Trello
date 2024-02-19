import styles from './ThemeSwither.module.scss'
export default function ThemeSwitcher() {
    return (
        <div className={styles.background}>
            <button className={styles.changeThemeIcon}>
                <span className={styles.iconSunMoon}></span>
                <span className={styles.sunRays}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
            </button>
        </div>
    );
}