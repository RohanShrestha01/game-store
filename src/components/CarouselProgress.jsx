import Skeleton from '@mui/material/Skeleton';
import classes from './CarouselProgress.module.css';

export const CarouselProgress = props => {
  return (
    <div className={classes['carousel-progress']}>
      {props.isLoading
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
        : props.featuredGames.map((gameObj, i) => (
            <figure
              key={gameObj.id}
              onClick={props.carouselItemClickHandler.bind(null, i)}
              className={`${classes['carousel-progress__figure']} ${
                i === props.active
                  ? classes['carousel-progress__figure--active']
                  : ''
              }`}
            >
              <img
                src={
                  gameObj.bgImage.slice(0, 28) +
                  'crop/600/400/' +
                  gameObj.bgImage.slice(28)
                }
                alt={gameObj.name + 'Game'}
                className={classes['carousel-progress__image']}
              />
              <figcaption className={classes['carousel-progress__caption']}>
                {gameObj.name}
              </figcaption>
            </figure>
          ))}
    </div>
  );
};
