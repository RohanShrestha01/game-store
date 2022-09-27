import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StyledTooltip } from '../styles/StyledTooltip';
import { Tabs, Tab } from '@mui/material';

import { BookmarkSvg } from '../icons/BookmarkSvg';
import { GamepadSvg } from '../icons/GamepadSvg';
import { HomeSvg } from '../icons/HomeSvg';
import { MovieSvg } from '../icons/MovieSvg';
import { MusicSvg } from '../icons/MusicSvg';
import { SettingsSvg } from '../icons/SettingsSvg';
import { StoreSvg } from '../icons/StoreSvg';

import classes from './Sidebar.module.css';

export const Sidebar = () => {
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

  const location = useLocation();
  const active = paths.indexOf(location.pathname.split('/')[1]);
  const [value, setValue] = useState(active === -1 ? 1 : active);
  const activeClass = `${classes['side-nav__link']} ${classes['side-nav__link--active']}`;

  return (
    <Tabs
      orientation="vertical"
      value={value}
      onChange={(_, newValue) => setValue(newValue)}
      sx={{ '& .MuiTabs-indicator': { right: 'initial' } }}
      component="nav"
      className={classes.sidebar}
    >
      {sideNavSvgs.map((SideNavSvg, id) => (
        <StyledTooltip title={paths[id]} placement="right" key={id}>
          <Tab
            icon={<SideNavSvg className={classes['side-nav__icon']} />}
            sx={{ minWidth: 0, py: '2rem' }}
            component={Link}
            to={paths[id]}
            className={id === value ? activeClass : classes['side-nav__link']}
          />
        </StyledTooltip>
      ))}
    </Tabs>
  );
};
