import classes from './Navbar.module.css';
import { NavItem } from './NavItem';

export const Navbar = () => {
  const titles = ['Games', 'Movies', 'Music', 'Apps'];

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
