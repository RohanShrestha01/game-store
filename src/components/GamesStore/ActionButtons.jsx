import classes from './ActionButtons.module.css';

import Button from '@mui/material/Button';
import {
  FileDownloadOutlined,
  AddShoppingCartRounded,
  ShoppingCartOutlined,
  NotificationAddOutlined,
} from '@mui/icons-material';

export const ActionButtons = ({ prices, variant }) => {
  const newPrice = prices?.price_new.toFixed(2);
  const isFree = +newPrice === 0 ? true : false;

  return (
    <div className={classes[variant]}>
      <Button
        variant="contained"
        href={isFree ? prices?.url : ''}
        target="_blank"
        onClick={e => {
          e.stopPropagation();
        }}
        className={classes['action-btn']}
        size={variant === 'carousel-slider__btns' ? 'large' : 'medium'}
        startIcon={
          isFree ? (
            <FileDownloadOutlined />
          ) : newPrice ? (
            <ShoppingCartOutlined />
          ) : (
            <NotificationAddOutlined />
          )
        }
      >
        {isFree ? 'Download' : newPrice ? 'Buy Now' : 'Notify Me'}
      </Button>
      {newPrice && (
        <Button
          variant="contained"
          size={variant === 'carousel-slider__btns' ? 'large' : 'medium'}
          className={classes['cart-btn']}
          onClick={e => {
            e.stopPropagation();
          }}
          startIcon={<AddShoppingCartRounded />}
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};
