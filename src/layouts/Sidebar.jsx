import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tabs, Tab, useMediaQuery } from '@mui/material';

import { StyledTooltip } from '../styles/StyledTooltip';
import {
  BookmarkSvg,
  GamepadSvg,
  HomeSvg,
  MovieSvg,
  MusicSvg,
  SettingsSvg,
  StoreSvg,
} from '../icons/AllSvgs';

import classes from './Sidebar.module.css';

export const Sidebar = () => {
  const matches450 = useMediaQuery('(max-width: 450px)');
  const sideNavSvgs = matches450
    ? [HomeSvg, StoreSvg, BookmarkSvg]
    : [
        HomeSvg,
        StoreSvg,
        GamepadSvg,
        MovieSvg,
        MusicSvg,
        BookmarkSvg,
        SettingsSvg,
      ];
  const paths = matches450
    ? ['home', 'store', 'bookmarks']
    : ['home', 'store', 'games', 'movies', 'music', 'bookmarks', 'settings'];

  const location = useLocation();
  const active = paths.indexOf(location.pathname.split('/')[1]);
  const [value, setValue] = useState(active === -1 ? 1 : active);
  const activeClass = `${classes['side-nav__link']} ${classes['side-nav__link--active']}`;

  const matches = useMediaQuery('(max-width: 600px)');

  return (
    <Tabs
      orientation={matches ? 'horizontal' : 'vertical'}
      value={value}
      onChange={(_, newValue) => setValue(newValue)}
      sx={{
        '& .MuiTabs-indicator': { right: 'initial' },
        '& .MuiTabs-flexContainer': { justifyContent: 'space-evenly' },
      }}
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
            label={matches ? paths[id] : ''}
          />
        </StyledTooltip>
      ))}
    </Tabs>
  );
};
