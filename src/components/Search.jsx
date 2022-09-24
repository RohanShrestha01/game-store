import classes from './Search.module.css';

import { SearchSvg } from '../icons/SearchSvg';
import { CrossSvg } from '../icons/CrossSvg';

export const Search = () => {
  return (
    <form className={classes.search}>
      <SearchSvg className={classes.search__icon} />
      <input
        type="text"
        placeholder="Search the store"
        className={classes.search__input}
        spellCheck="false"
      />
      <button type="reset" className={classes['search__reset-btn']}>
        <CrossSvg className={classes['search__reset-icon']} />
      </button>
    </form>
  );
};
