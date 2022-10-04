import classes from './GamePrice.module.css';
import Button from '@mui/material/Button';

export const GamePrice = ({ prices, variant, releaseDate }) => {
  const newPrice = prices?.price_new.toFixed(2);
  const oldPrice = prices?.price_old.toFixed(2);
  let priceCut = prices?.price_cut;
  if (priceCut === 0) priceCut = false;
  const isFree = +newPrice === 0 ? true : false;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // To set hour to midnight
  const isReleased = new Date(releaseDate) < today;

  const btnSize = variant === 'carouselSlider' ? 'large' : 'small';

  return (
    <section className={classes[variant]}>
      {isFree ? (
        <div className={classes.game__free}>Free</div>
      ) : !isReleased && !newPrice ? (
        <div className={classes.game__release}>
          Available {releaseDate.replaceAll('-', '/')}
        </div>
      ) : (
        <div className={classes.game__price}>
          <span className={classes['game__price--new']}>
            {newPrice ? '$' + newPrice : 'N/A'}
          </span>
          {priceCut && (
            <>
              <span className={classes['game__price--old']}>
                {'$' + oldPrice}
              </span>
              <span className={classes['game__price--cut']}>
                {'-' + priceCut + '%'}
              </span>
            </>
          )}
        </div>
      )}
      {variant === 'carouselSlider' && (
        <div className={classes['action-btns']}>
          <Button
            variant="contained"
            href={prices?.url}
            target="_blank"
            className={classes['action-btn']}
            size={btnSize}
          >
            {isFree ? 'Download' : newPrice ? 'Buy Now' : 'Notify Me'}
          </Button>
          {newPrice && (
            <Button
              variant="contained"
              size={btnSize}
              className={classes['cart-btn']}
            >
              Add to Cart
            </Button>
          )}
        </div>
      )}
    </section>
  );
};
