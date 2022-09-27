import { useQuery } from '@tanstack/react-query';

import { getGames, getPrices } from '../utils/api';
import { Error } from './Error';
import { Carousel } from '../components/Carousel';

export const GameStore = () => {
  const featuredQuery = useQuery(
    ['games', 'featured'],
    () =>
      getGames(
        `https://rawg.io/api/games/lists/greatest?ordering=-added&page_size=6&key=c542e67aec3a4340908f9de9e86038af`
      ),
    { networkMode: 'always', refetchOnReconnect: true }
  );
  const gamesQuery = useQuery(
    ['games'],
    () =>
      getGames(
        `https://rawg.io/api/games?dates=2020-01-01,2022-12-31&page=1&page_size=40&key=c542e67aec3a4340908f9de9e86038af`
      ),
    { networkMode: 'always', refetchOnReconnect: true }
  );

  const featured = featuredQuery?.data;
  const games = gamesQuery?.data;
  const error = featuredQuery?.error ?? gamesQuery?.error;

  const featuredPricesQuery = useQuery(
    ['prices', 'featured'],
    () => getPrices(featured),
    { enabled: !!featured }
  );
  const gamesPricesQuery = useQuery(
    ['prices', 'games'],
    () => getPrices(games),
    { enabled: !!games }
  );

  if (error) return <Error error={error} />;

  return (
    <>
      <Carousel featured={featured} isLoading={featuredQuery.isLoading} />
    </>
  );
};
