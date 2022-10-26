import { useQuery } from '@tanstack/react-query';

const getPlains = games => {
  const chars = {
    '-': '',
    ':': '',
    "'": '',
    '’': '',
    '&': 'and',
    '!': '',
    '(': '',
    ')': '',
    '.': '',
    ',': '',
    '#': '',
    '/': '',
    '~': '',
    1: 'i',
    2: 'ii',
    3: 'iii',
    4: 'iv',
    5: 'v',
    6: 'vi',
    7: 'vii',
    8: 'viii',
    9: 'ix',
  };

  return games
    .map(game =>
      game.name
        .replace(/[-:'’&!().,#/~123456789]/g, c => chars[c])
        .toLowerCase()
        .replace(/\bthe\b/g, '')
        .replaceAll(' ', '')
    )
    .join(',');
};

export const useGamesData = (category, page = 1, searchQuery = null) => {
  const {
    data,
    isLoading: gamesIsLoading,
    error: gamesError,
  } = useQuery(['games', category, page], () =>
    fetch(
      `https://firestore-api-production.up.railway.app/games/${category}?page=${page}&search=${searchQuery}`
    ).then(res => res.json())
  );

  let games = data?.games;
  const gamesCount = data?.count;

  const plains = games && getPlains(games);

  const {
    data: pricesList,
    isLoading: pricesIsLoading,
    error: pricesError,
  } = useQuery(
    ['prices', category, page],
    () =>
      fetch(
        `https://firestore-api-production.up.railway.app/prices?plains=${plains}`
      ).then(res => res.json()),
    {
      enabled: !!games && games.length !== 0,
    }
  );

  return {
    games,
    gamesIsLoading,
    gamesError,
    pricesList,
    pricesIsLoading,
    pricesError,
    gamesCount,
  };
};
