import { NavLink } from 'react-router-dom'
import styles from './Header.module.scss'
import ThemeSwither from '../ThemeSwither/ThemeSwither.tsx'

enum Tabs {
  HOME = 'home',
  BOARD = 'board',
  LINK1 = 'link1',
}

export default function Header() {
  const { link, active } = styles
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink
          className={({ isActive }) => (isActive ? `${active} ${link}` : `${link}`)}
          to={`/`}
          end
        >
          {Tabs.HOME}
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${active} ${link}` : `${link}`)}
          to={`/${Tabs.BOARD}`}
          end
        >
          {Tabs.BOARD}
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${active} ${link}` : `${link}`)}
          to={`/${Tabs.LINK1}`}
          end
        >
          {Tabs.LINK1}
        </NavLink>
      </nav>
      <ThemeSwither />
    </header>
  )
}
