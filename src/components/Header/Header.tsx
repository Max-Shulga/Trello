import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getBoards } from '../../store/reducers/actions';
import ThemeSwither from '../../ui/ThemeSwither/ThemeSwither';
import SignOut from './components/SignOut';
import styles from './Header.module.scss';

function Header():React.JSX.Element {
  const { link, active } = styles;
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.home);
  useEffect(() => {
    dispatch(getBoards());
  }, []);

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
        {boards.map((board) => (
          <NavLink
            className={({ isActive }) => (isActive ? `${active} ${link}` : `${link}`)}
            key={board.id}
            to={`/board/${board.id}`}
          >
            {board.title}
          </NavLink>
        ))}
      </nav>
      <ThemeSwither />
      <SignOut />
    </header>
  );
}
export default Header;
