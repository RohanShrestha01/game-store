import classes from './ActionButtons.module.css';

import Button from '@mui/material/Button';

export const ActionButtons = ({ prices, variant }) => {
  const newPrice = prices?.price_new.toFixed(2);
  const isFree = +newPrice === 0 ? true : false;

  return (
    <div className={classes[variant]}>
      <Button
        variant="contained"
        href={prices?.url}
        target="_blank"
        className={classes['action-btn']}
        size="large"
      >
        {isFree ? 'Download' : newPrice ? 'Buy Now' : 'Notify Me'}
      </Button>
      {newPrice && (
        <Button
          variant="contained"
          size="large"
          className={classes['cart-btn']}
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};
