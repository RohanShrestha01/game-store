import { useSelector } from 'react-redux';

import { GamePlatforms } from '../components/GamesStore/GamePlatforms';
import { GamePrice } from '../components/GamesStore/GamePrice';
import { BookmarksButton } from '../components/GamesStore/BookmarksButton';

import styles from '../components/GamesStore/GamesList.module.css';
import classes from '../components/GamesStore/GameCard.module.css';

const Bookmarks = () => {
  const bookmarkedGames = useSelector(state => state.bookmarks.bookmarkedItems);
  const bookmarkedGamesPrices = useSelector(
    state => state.bookmarks.bookmarkedItemsPrices
  );

  return (
    <section>
      <h1 className={styles.header}>Bookmarks</h1>
      {bookmarkedGames.length === 0 ? (
        <p style={{ marginTop: '1.2rem' }}>
          You haven't added anything to your bookmarks yet.
        </p>
      ) : (
        <div className={styles['game-cards']}>
          {bookmarkedGames.map((game, id) => (
            <div className={classes['game-card']} key={id}>
              <BookmarksButton
                variant="icon"
                game={game}
                prices={bookmarkedGamesPrices[id]}
              />
              <img
                src={
                  game?.bgImage?.slice(0, 28) +
                  'crop/600/400/' +
                  game?.bgImage?.slice(28)
                }
                alt={game.name + ' Game'}
                className={classes.game__image}
              />
              <div className={classes.game__details}>
                <h3 className={classes.game__title} title={game.name}>
                  {game.name}
                </h3>
                <p
                  className={classes.game__genre}
                  title={game.genres.map(genre => genre.name).join(', ')}
                >
                  {game.genres.map(genre => genre.name).join(', ')}
                </p>
                <div className={classes.game__section}>
                  <GamePrice
                    prices={bookmarkedGamesPrices[id]}
                    releaseDate={game.released}
                    variant="game-card__price"
                  />
                  <span className={classes.game__platforms}>
                    <GamePlatforms platforms={game.platforms} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Bookmarks;
