import { NavLink } from 'react-router-dom';

import { BookmarkSvg } from '../icons/BookmarkSvg';
import { GamepadSvg } from '../icons/GamepadSvg';
import { HomeSvg } from '../icons/HomeSvg';
import { MovieSvg } from '../icons/MovieSvg';
import { MusicSvg } from '../icons/MusicSvg';
import { SettingsSvg } from '../icons/SettingsSvg';
import { StoreSvg } from '../icons/StoreSvg';

import classes from './Sidebar.module.css';

export const Sidebar = () => {
  const activeClass = `${classes['side-nav__link']} ${classes['side-nav__link--active']}`;
  const sideNavSvgs = [
    HomeSvg,
    StoreSvg,
    GamepadSvg,
    MovieSvg,
    MusicSvg,
    BookmarkSvg,
    SettingsSvg,
  ];
  const paths = [
    'home',
    'store',
    'games',
    'movies',
    'music',
    'bookmarks',
    'settings',
  ];

  return (
    <nav className={classes.sidebar}>
      <ul className={classes['side-nav']}>
        {sideNavSvgs.map((SideNavSvg, id) => (
          <li className={classes['side-nav__item']} key={id}>
            <NavLink
              to={paths[id]}
              className={NavData =>
                NavData.isActive ? activeClass : classes['side-nav__link']
              }
            >
              <SideNavSvg className={classes['side-nav__icon']} />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
