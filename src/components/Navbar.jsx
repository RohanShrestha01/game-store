import { useMediaQuery } from '@mui/material';
import classes from './Navbar.module.css';
import { NavItem } from './NavItem';

export const Navbar = () => {
  const matches = useMediaQuery('(max-width: 450px)');
  const titles = matches ? ['Games'] : ['Games', 'Movies', 'Music', 'Apps'];

  return (
    <nav className={classes['nav']}>
      <ul className={classes['nav__list']}>
        {titles.map((title, id) => (
          <NavItem title={title} key={id} />
        ))}
      </ul>
    </nav>
  );
};
