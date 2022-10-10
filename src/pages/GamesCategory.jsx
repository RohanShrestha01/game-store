import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGamesData } from '../hooks/useGamesData';

import Pagination from '@mui/material/Pagination';
import { GamesList } from '../components/GamesStore/GamesList';
import { sliderData } from './GameStore';
import { PageNotFound } from './PageNotFound';
import { Error } from './Error';

export const paginationStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '5rem',
  '& .MuiPaginationItem-text': {
    color: 'common.white',
    fontSize: '1.4rem',
  },
};

export const GamesCategory = () => {
  window.scrollTo(0, 0);
  const [page, setPage] = useState(1);

  const category = useParams().category;

  let heading;
  let categoryMatch = false;

  for (const array of sliderData) {
    if (array[1] === category) {
      heading = array[0];
      categoryMatch = true;
      break;
    }
  }

  const { gamesError, gamesCount } = useGamesData(category, page);
  const pageCount = Math.ceil(gamesCount / 40);

  if (!categoryMatch) return <PageNotFound />;

  if (gamesError) return <Error error={gamesError} />;

  return (
    <>
      <GamesList category={category} heading={heading} page={page} />
      <Pagination
        count={isNaN(pageCount) ? 0 : pageCount}
        color="primary"
        size="large"
        shape="rounded"
        sx={paginationStyle}
        page={page}
        onChange={(_event, value) => setPage(value)}
      />
    </>
  );
};
