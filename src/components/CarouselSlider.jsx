import classes from './CarouselSlider.module.css';

import { Button, IconButton, Rating, Skeleton } from '@mui/material';
import { CircularScoreProgress } from '../styles/CircularScoreProgress';
import { GamePlatforms } from './GamePlatforms';
import { GamePrice } from './GamePrice';
import { useGamesData } from '../hooks/useGamesData';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

export const CarouselSlider = ({ active, featured, prices }) => {
  const { gamesIsLoading, pricesIsLoading } = useGamesData('featured');

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
          >
            {game.metacriticScore && (
              <div className={classes['carousel-slider__score']}>
                <CircularScoreProgress value={game.metacriticScore} />
              </div>
            )}
            <img
              src={game.bgImage}
              alt={game.name + ' Game'}
              className={classes['carousel-slider__image']}
            />
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
                <GamePrice
                  prices={prices[i].list[0]}
                  releaseDate={game.released}
                  variant="carouselSlider"
                />
              )}
              <Button
                variant="text"
                startIcon={<AddCircleOutlineRoundedIcon />}
                sx={{
                  alignSelf: 'flex-start',
                  color: 'white',
                  fontSize: '1.2rem',
                  pl: '1rem',
                  '&:hover': {
                    backgroundColor: 'grey.main',
                  },
                }}
              >
                Add to Bookmarks
              </Button>
            </figcaption>
            <div className={classes['screenshots']}>
              <span className={classes['scenes-text']}>Scenes</span>
              <div className={classes['clip-btn']}>
                {/* <div>Watch Trailer</div>
                <IconButton color="primary">
                  <PlayArrowRoundedIcon sx={{ fontSize: '7rem' }} />
                </IconButton> */}
              </div>
              {game.screenshots.slice(1, 6).map(screenshot => (
                <img
                  src={
                    screenshot.image.slice(0, 28) +
                    'crop/600/400/' +
                    screenshot.image.slice(28)
                  }
                  alt="screenshot of game"
                  className={classes['screenshots__img']}
                  key={screenshot.id}
                />
              ))}
            </div>
          </figure>
        ))
      )}
    </div>
  );
};
