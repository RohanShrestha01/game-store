import { useState } from 'react';
import { IconButton } from '@mui/material';
import classes from './Search.module.css';

import { SearchSvg } from '../icons/SearchSvg';
import { CrossSvg } from '../icons/CrossSvg';

export const Search = () => {
  const [crossShow, setCrossShow] = useState(false);

  return (
    <form className={classes.search}>
      <SearchSvg className={classes.search__icon} />
      <input
        type="text"
        placeholder="Search the store"
        className={classes.search__input}
        spellCheck="false"
        onChange={e =>
          e.target.value ? setCrossShow(true) : setCrossShow(false)
        }
      />
      <IconButton
        type="reset"
        className={classes['search__reset-btn']}
        sx={{ visibility: crossShow ? 'visible' : 'hidden' }}
        onClick={() => setTimeout(() => setCrossShow(false), 400)}
      >
        <CrossSvg className={classes['search__reset-icon']} />
      </IconButton>
    </form>
  );
};
