import { useNavigate } from 'react-router-dom';
import { Badge, IconButton } from '@mui/material';

import classes from './Header.module.css';

import logo from '../assets/logo.png';
import { AdjustmentsSvg, BellSvg, UsersSvg } from '../icons/AllSvgs';
import { Navbar } from '../components/Navbar';
import { Search } from '../components/Search';
import { Profile } from '../components/Profile';
import { StyledTooltip } from '../styles/StyledTooltip';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={classes.header}>
      <section className={classes.header__left}>
        <div className={classes.logo} onClick={() => navigate('/store/games')}>
          <img src={logo} alt="logo" className={classes.logo__image} />
        </div>
        <Navbar />
      </section>

      <section className={classes.header__middle}>
        <Search />
        <StyledTooltip title="filter">
          <IconButton className={classes['filter-btn']}>
            <AdjustmentsSvg className={classes['filter-btn__icon']} />
          </IconButton>
        </StyledTooltip>
      </section>

      <section className={classes.header__right}>
        <Profile />
        <StyledTooltip title="notifications">
          <IconButton className={classes['notification-btn']} color="primary">
            <Badge
              badgeContent={5}
              overlap="circular"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '1rem',
                  color: 'common.white',
                  bgcolor: 'red',
                },
              }}
            >
              <BellSvg className={classes['notification-btn__icon']} />
            </Badge>
          </IconButton>
        </StyledTooltip>
        <StyledTooltip title="friends">
          <IconButton className={classes['friends-btn']} color="primary">
            <UsersSvg className={classes['friends-btn__icon']} />
            <span className={classes['friends-btn__number']}>25</span>
          </IconButton>
        </StyledTooltip>
      </section>
    </header>
  );
};
