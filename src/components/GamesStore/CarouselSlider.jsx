import { useDispatch } from 'react-redux';
import { Rating, Skeleton, useMediaQuery } from '@mui/material';

import classes from './CarouselSlider.module.css';

import { CircularScoreProgress } from '../../styles/CircularScoreProgress';
import { GamePlatforms } from './GamePlatforms';
import { GamePrice } from './GamePrice';
import { useGamesData } from '../../hooks/useGamesData';
import { ActionButtons } from './ActionButtons';
import { gameModalActions } from '../../store/gameModalSlice';
import { BookmarksButton } from './BookmarksButton';

export const CarouselSlider = ({ active, featured, prices }) => {
  const { gamesIsLoading, pricesIsLoading } = useGamesData('featured');
  const dispatch = useDispatch();

  const matches = useMediaQuery('(max-width: 1200px)');

  return (
    <div className={classes['carousel-slider']}>
      {gamesIsLoading ? (
        <Skeleton variant="rounded" sx={{ height: '100%' }} />
      ) : (
        featured.map((game, i) => (
          <figure
            key={game.id}
            className={`${classes['carousel-slider__figure']} ${
              i === active ? classes['carousel-slider__figure--active'] : ''
            }`}
            onClick={() => {
              !pricesIsLoading &&
                dispatch(
                  gameModalActions.showModal({
                    game,
                    pricesList: prices?.[i].list,
                  })
                );
            }}
          >
            {game.metacriticScore && (
              <div className={classes['carousel-slider__score']}>
                <CircularScoreProgress value={game.metacriticScore} />
              </div>
            )}
            <picture>
              <source
                srcSet={`${
                  game.bgImage.slice(0, 28) +
                  'resize/420/-/' +
                  game.bgImage.slice(28)
                } 1x, ${
                  game.bgImage.slice(0, 28) +
                  'crop/600/400/' +
                  game.bgImage.slice(28)
                } 2x`}
                media="(max-width:37.5em)"
                className={classes['carousel-slider__image']}
              />
              <img
                src={
                  game.bgImage.slice(0, 28) +
                  'resize/1280/-/' +
                  game.bgImage.slice(28)
                }
                alt={game.name + ' Game'}
                className={classes['carousel-slider__image']}
              />
            </picture>
            <figcaption className={classes['carousel-slider__caption']}>
              <h1 className={classes['caption__header']}>{game.name}</h1>
              <Rating
                name={game.slug}
                value={game.rating}
                precision={0.5}
                size="large"
                readOnly
                sx={{ '& .MuiRating-icon': { color: 'inherit' } }}
                className={classes['caption__rating']}
              />
              <div className={classes['caption__platforms']}>
                <GamePlatforms platforms={game.platforms} />
              </div>
              <div className={classes['caption__genre']}>
                Genre:&emsp;{game.genres.map(genre => genre.name).join(', ')}
              </div>
              <div className={classes['caption__release']}>
                Release Date:&emsp;{game.released}
              </div>
              {pricesIsLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  <GamePrice
                    prices={prices?.[i].list[0]}
                    releaseDate={game.released}
                    variant="carousel-slider__price"
                  />
                  <ActionButtons
                    game={game}
                    prices={prices?.[i].list[0]}
                    variant="carousel-slider__btns"
                  />
                  <BookmarksButton game={game} prices={prices?.[i].list[0]} />
                </>
              )}
            </figcaption>
            {!matches && (
              <div className={classes['screenshots']}>
                <span className={classes['scenes-text']}>Scenes</span>
                <div className={classes['clip-btn']}></div>
                {game.screenshots.slice(1, 6).map(screenshot => (
                  <img
                    src={
                      screenshot.image.slice(0, 28) +
                      'resize/420/-/' +
                      screenshot.image.slice(28)
                    }
                    alt="screenshot of game"
                    className={classes['screenshots__img']}
                    key={screenshot.id}
                  />
                ))}
              </div>
            )}
          </figure>
        ))
      )}
    </div>
  );
};
