import styles from './ThemeSwither.module.scss'
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts'
import { toggleTheme } from '../../features/themeToggleSlice.ts'
import { useEffect } from 'react'


export default function ThemeSwitcher() {
    const theme = useAppSelector((state)=>state.themeToggle.theme)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        document.documentElement.dataset.theme = theme
    })
    return (
        <div className={styles.background}>
            <button
                onClick={()=>dispatch(toggleTheme())}
                className={styles.changeThemeIcon}>
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
    )
}