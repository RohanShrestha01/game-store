import logo from '../assets/logo.png';

import classes from './Header.module.css';

import { AdjustmentsSvg } from '../icons/AdjustmentsSvg';
import { BellSvg } from '../icons/BellSvg';
import { UsersSvg } from '../icons/UsersSvg';

import { Navbar } from '../components/Navbar';
import { Search } from '../components/Search';
import { Profile } from '../components/Profile';
import { SvgButton } from '../components/SvgButton';

export const Header = () => {
  return (
    <header className={classes.header}>
      <section className={classes.header__left}>
        <div className={classes.logo}>
          <img src={logo} alt="logo" className={classes.logo__image} />
        </div>
        <Navbar />
      </section>

      <section className={classes.header__middle}>
        <Search />
        <SvgButton type="filter">
          <AdjustmentsSvg className={classes['filter-btn__icon']} />
        </SvgButton>
      </section>

      <section className={classes.header__right}>
        <Profile />
        <SvgButton type="notification" number="5">
          <BellSvg className={classes['notification-btn__icon']} />
        </SvgButton>
        <SvgButton type="friends" number="25">
          <UsersSvg className={classes['friends-btn__icon']} />
        </SvgButton>
      </section>
    </header>
  );
};
