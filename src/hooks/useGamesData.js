import { useQuery } from '@tanstack/react-query';
import { getGames, getPrices } from '../utils/api';

export const useGamesData = category => {
  let url;
  if (category === 'featured')
    url = `https://rawg.io/api/games?dates=2020-01-01,2022-12-31&page=1&page_size=40&key=c542e67aec3a4340908f9de9e86038af`;
  else if (category === 'popular')
    url = `https://rawg.io/api/games?page=1&page_size=40&key=c542e67aec3a4340908f9de9e86038af`;
  else if (category === 'BOAT')
    url = `https://rawg.io/api/games/lists/popular?page_size=40&page=1&key=c542e67aec3a4340908f9de9e86038af`;
  else if (category === 'BOTY')
    url = `https://rawg.io/api/games/lists/greatest?ordering=-added&page_size=40&key=c542e67aec3a4340908f9de9e86038af`;
  else if (category === 'new')
    url = `https://rawg.io/api/games/lists/recent-games-past?ordering=-added&page_size=40&page=1&key=c542e67aec3a4340908f9de9e86038af`;
  else if (category === 'all')
    url = `https://rawg.io/api/games/lists/main?ordering=-released&page_size=40&page=1&key=c542e67aec3a4340908f9de9e86038af`;

  const {
    data,
    isLoading: gamesIsLoading,
    error: gamesError,
  } = useQuery(['games', category], () => getGames(url));

  const games = data?.results;
  const gamesCount = data?.count;
  const nextPage = data?.next;
  const previousPage = data?.previous;

  const {
    data: pricesList,
    isLoading: pricesIsLoading,
    error: pricesError,
  } = useQuery(['prices', category], () => getPrices(games), {
    enabled: !!games,
  });

  return {
    games,
    gamesIsLoading,
    gamesError,
    pricesList,
    pricesIsLoading,
    pricesError,
    gamesCount,
    nextPage,
    previousPage,
  };
};
