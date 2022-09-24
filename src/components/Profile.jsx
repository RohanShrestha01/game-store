import user from '../assets/user.png';

import classes from './Profile.module.css';
import { AngleDownSvg } from '../icons/AngleDownSvg';

export const Profile = () => {
  return (
    <div className={classes.profile}>
      <img
        src={user}
        alt="profile of user"
        className={classes.profile__picture}
      />
      <article className={classes.profile__details}>
        <span className={classes.profile__name}>Rohan Shrestha</span>
        <span className={classes.profile__status}>Online</span>
      </article>
      <AngleDownSvg className={classes['profile__options-icon']} />
    </div>
  );
};
