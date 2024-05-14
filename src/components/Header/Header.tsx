import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { getBoards } from '../../store/actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import ThemeSwither from '../ThemeSwither/ThemeSwither';
import styles from './Header.module.scss';

function Header():React.JSX.Element {
  const { link, active } = styles;
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.home);
  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink
          className={({ isActive }) => (isActive ? `${active} ${link}` : `${link}`)}
          to="/"
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
  );
}
export default Header;
