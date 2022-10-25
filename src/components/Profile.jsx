import { Avatar } from '@mui/material';

import user from '../assets/user.png';
import classes from './Profile.module.css';
import { AngleDownSvg } from '../icons/AllSvgs';
import { StatusBadge } from '../styles/StatusBadge';

export const Profile = () => {
  return (
    <div className={classes.profile}>
      <StatusBadge
        variant="dot"
        overlap="circular"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Avatar
          src={user}
          alt="profile of user"
          className={classes.profile__picture}
        />
      </StatusBadge>
      <article className={classes.profile__details}>
        <span className={classes.profile__name}>Rohan Shrestha</span>
        <span className={classes.profile__status}>Online</span>
      </article>
      <AngleDownSvg className={classes['profile__options-icon']} />
    </div>
  );
};
