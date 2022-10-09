import classes from './CarouselProgress.module.css';
import Skeleton from '@mui/material/Skeleton';
import { useGamesData } from '../../hooks/useGamesData';

export const CarouselProgress = ({ active, clickHandler, featured }) => {
  const { gamesIsLoading } = useGamesData('featured');

  return (
    <div className={classes['carousel-progress']}>
      {gamesIsLoading
        ? [...Array(6)].map((_, i) => (
            <figure
              key={i}
              className={classes['carousel-progress__figure']}
              style={{ pointerEvents: 'none' }}
            >
              <Skeleton
                variant="rounded"
                className={classes['carousel-progress__image']}
              />
              <Skeleton variant="text" width={80} height={35} />
            </figure>
          ))
        : featured.map((game, i) => (
            <figure
              key={game.id}
              onClick={clickHandler.bind(null, i)}
              className={`${classes['carousel-progress__figure']} ${
                i === active ? classes['carousel-progress__figure--active'] : ''
              }`}
            >
              <img
                src={
                  game.bgImage.slice(0, 28) +
                  'crop/600/400/' +
                  game.bgImage.slice(28)
                }
                alt={game.name + ' Game'}
                className={classes['carousel-progress__image']}
              />
              <figcaption className={classes['carousel-progress__caption']}>
                {game.name}
              </figcaption>
            </figure>
          ))}
    </div>
  );
};
