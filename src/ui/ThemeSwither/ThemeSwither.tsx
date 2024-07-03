import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTheme } from '../../store/reducers/themeToggle/themeToggleSlice';
import styles from './ThemeSwither.module.scss';

function ThemeSwitcher():React.JSX.Element {
  const theme = useAppSelector((state) => state.themeToggle.theme);
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className={styles.background}>
      <button
        aria-label="theme swither button"
        type="button"
        onClick={() => dispatch(toggleTheme())}
        className={styles.changeThemeIcon}
      >
        <span className={styles.iconSunMoon} />
        <span className={styles.sunRays}>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </span>
      </button>
    </div>
  );
}
export default ThemeSwitcher;
