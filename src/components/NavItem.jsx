import { NavLink } from 'react-router-dom';
import classes from './NavItem.module.css';

export const NavItem = props => {
  const activeClass = `${classes.nav__link} ${classes['nav__link--active']}`;

  return (
    <li className={classes['nav__item']}>
      <NavLink
        to={`store/${props.title.toLowerCase()}`}
        className={({ isActive }) =>
          isActive ? activeClass : classes.nav__link
        }
      >
        {props.title}
      </NavLink>
    </li>
  );
};
