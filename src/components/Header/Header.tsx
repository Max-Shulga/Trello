import { NavLink } from 'react-router-dom'
import styles from './Header.module.scss'
import ThemeSwither from '../ThemeSwither/ThemeSwither.tsx'
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts'
import { getBoards, loadAllBoards } from '../../features/HomeBoardsSlice.ts'
import { useEffect } from 'react'

export default function Header() {
  const { link, active } = styles
  const dispatch = useAppDispatch()
  const boards = useAppSelector(getBoards)

  useEffect(() => {
    dispatch(loadAllBoards())
  }, [])

  // useEffect(() => {
  //   const handleTitleChange = () => {
  //     const state = store.getState();
  //     const currentBoardId = state.board.id;
  //     if (currentBoardId) {
  //       const currentBoard = state.boards.boards.find(board => board.id === currentBoardId);
  //       console.log(`currentBoard: ${currentBoard?.title} state.board: ${state.board.title}`);
  //       if (currentBoard && currentBoard.title !== state.board.title) {
  //         dispatch(loadAllBoards());
  //       }
  //     }
  //   };
  //
  //   const unsubscribe = store.subscribe(handleTitleChange);
  //
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [dispatch, boards]);

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
        <span className={styles.verticalLine} />
        {boards.map((board, id) => (
          <NavLink
            className={({ isActive }) => (isActive ? `${active} ${link}` : `${link}`)}
            key={id}
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
