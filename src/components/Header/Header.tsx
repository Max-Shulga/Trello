import { NavLink } from 'react-router-dom'
import styles from './Header.module.scss'
import ThemeSwither from '../ThemeSwither/ThemeSwither.tsx'

enum Tabs {
  BOARD = 'board',
  LINK1 = 'link1',
  LINK2 = 'link2',
}

export default function Header() {
  const { link, active } = styles
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${active} ${link}` : `${link}`
          }
          to={`/${Tabs.BOARD}`}
          end
        >
          {Tabs.BOARD}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${active} ${link}` : `${link}`
          }
          to={`/${Tabs.LINK1}`}
          end
        >
          {Tabs.LINK1}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${active} ${link}` : `${link}`
          }
          to={`/${Tabs.LINK2}`}
          end
        >
          {Tabs.LINK2}
        </NavLink>
      </nav>
      <ThemeSwither />
    </header>
  )
}
