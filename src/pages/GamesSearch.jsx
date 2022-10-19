import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

import { useGamesData } from '../hooks/useGamesData';
import { paginationStyle } from './GamesCategory';
import { GamesList } from '../components/GamesStore/GamesList';
import { Error } from './Error';

const GamesSearch = () => {
  window.scrollTo(0, 0);
  const [page, setPage] = useState(1);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query');

  const { gamesError, gamesCount } = useGamesData('search', page, searchQuery);
  const pageCount = Math.ceil(gamesCount / 40);

  if (gamesError) return <Error error={gamesError} />;

  return (
    <>
      <GamesList
        category="search"
        heading="Search Results"
        page={page}
        searchQuery={searchQuery}
      />
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

export default GamesSearch;
