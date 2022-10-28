import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classes from './NavItem.module.css';

export const NavItem = props => {
  const [isDisabled, setIsDisabled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/store')) setIsDisabled(false);
    else setIsDisabled(true);
  }, [location.pathname]);

  const activeClass = `${classes.nav__link} ${classes['nav__link--active']}`;
  const disabledClass = `${classes.nav__link} ${classes['nav__link--disabled']}`;

  return (
    <li className={classes['nav__item']}>
      <NavLink
        to={`store/${props.title.toLowerCase()}`}
        className={({ isActive }) =>
          isActive
            ? activeClass
            : isDisabled
            ? disabledClass
            : classes.nav__link
        }
      >
        {props.title}
      </NavLink>
    </li>
  );
};
