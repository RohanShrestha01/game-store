import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import {
  FileDownloadOutlined,
  AddShoppingCartRounded,
  ShoppingCartOutlined,
  NotificationAddOutlined,
  RemoveShoppingCartOutlined,
} from '@mui/icons-material';

import classes from './ActionButtons.module.css';
import { cartSliceActions } from '../../store/cartSlice';
import { toastSliceActions } from '../../store/toastSlice';

export const ActionButtons = ({ game, prices, variant }) => {
  const newPrice = prices?.price_new.toFixed(2);
  const isFree = +newPrice === 0 ? true : false;

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const presentInCart = cartItems.find(item => item.id === game.id);

  const buyClickHandler = async e => {
    e.stopPropagation();
    if (!isFree && newPrice) {
      const res = await fetch(
        'https://alert-viper.cyclic.app/create-checkout-session',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify([{ name: game.name, price: newPrice }]),
        }
      );
      if (!res.ok) {
        console.error('Something went wrong!');
        return;
      }
      const { url } = await res.json();
      window.location = url;
    }
  };

  const cartBtnClickHandler = e => {
    e.stopPropagation();
    if (presentInCart) {
      dispatch(cartSliceActions.remove(game.id));
      dispatch(toastSliceActions.addInfoToast('Item Removed from the Cart!'));
    } else {
      dispatch(cartSliceActions.add({ game: game, pricesList: prices }));
      dispatch(toastSliceActions.addSuccessToast('Item Added to the Cart.'));
    }
  };

  const Icon = presentInCart
    ? RemoveShoppingCartOutlined
    : AddShoppingCartRounded;

  return (
    <div className={classes[variant]}>
      <Button
        variant="contained"
        href={isFree ? prices?.url : ''}
        target="_blank"
        onClick={buyClickHandler}
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
          onClick={cartBtnClickHandler}
          color={presentInCart ? 'error' : 'primary'}
          startIcon={<Icon />}
        >
          {presentInCart ? 'Remove From Cart' : 'Add to Cart'}
        </Button>
      )}
    </div>
  );
};
