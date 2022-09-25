import classes from './CarouselSlider.module.css';

export const CarouselSlider = props => {
  return (
    <div className={classes['carousel-slider']}>
      {props.featuredGames.map((gameObj, i) => (
        <figure
          key={gameObj.id}
          className={`${classes['carousel-slider__figure']} ${
            i === props.active ? classes['carousel-slider__figure--active'] : ''
          }`}
        >
          <img
            src={gameObj.bgImage}
            alt={gameObj.name + 'Game'}
            className={classes['carousel-slider__image']}
          />
          <figcaption className={classes['carousel-slider__caption']}>
            {gameObj.name}
          </figcaption>
        </figure>
      ))}
    </div>
  );
};
