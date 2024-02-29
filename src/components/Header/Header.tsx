import { NavLink } from 'react-router-dom'
import styles from './Header.module.scss'
import ThemeSwither from '../ThemeSwither/ThemeSwither.tsx'
import { useAppSelector } from '../../app/hooks.ts'

export default function Header() {
  const { link, active } = styles

  const boards = useAppSelector(state => state.allBoards.boardsIcons)
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink
          className={({ isActive }) => (isActive ? `${active} ${link}` : `${link}`)}
          to={`/`}
          end
        >
          home
        </NavLink>
        {boards.map(board => (
          <NavLink
            className={({ isActive }) => (isActive ? `${active} ${link}` : `${link}`)}
            to={`/board/${board.id}`}
          >
            {board.title}
          </NavLink>
        ))}
      </nav>
      <ThemeSwither />
    </header>
  )
}
