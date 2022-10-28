import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ChevronLeftRounded,
  ShoppingCartOutlined,
  HighlightOffRounded,
} from '@mui/icons-material';
import { Button, Rating } from '@mui/material';

import classes from './Cart.module.css';
import { GamePrice } from '../GamePrice';
import { cartSliceActions } from '../../../store/cartSlice';
import { toastSliceActions } from '../../../store/toastSlice';
import { BookmarksButton } from '../BookmarksButton';

export const Cart = ({ setShowCart }) => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const cartItemsPrices = useSelector(state => state.cart.cartItemsPrices);
  const totalPriceInCents = useSelector(state => state.cart.totalPriceInCents);
  const totalItems = cartItems.length;

  const dispatch = useDispatch();
  const [stripeLoading, setStripeLoading] = useState(false);

  const gamesWithPrice = cartItems.map((item, i) => ({
    name: item.name,
    price: cartItemsPrices[i].price_new,
  }));

  const payClickHandler = async () => {
    setStripeLoading(true);
    const res = await fetch(
      'https://alert-viper.cyclic.app/create-checkout-session',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gamesWithPrice),
      }
    );
    if (!res.ok) {
      console.error('Something went wrong!');
      return;
    }
    const { url } = await res.json();
    window.location = url;
  };

  return (
    <div className={classes['cart-container']}>
      <button
        onClick={() => setShowCart(false)}
        className={classes['cart__heading']}
      >
        <ChevronLeftRounded fontSize="large" />
        <span className={classes['heading']}>Your Cart</span>
        <span className={classes['cart__items-num']}>({totalItems} items)</span>
      </button>
      {totalItems === 0 ? (
        <div className={classes['cart__empty']}>
          <ShoppingCartOutlined sx={{ fontSize: '8rem' }} />
          <h3 className={classes['cart__empty-text']}>Your cart is empty.</h3>
          <Button variant="contained" onClick={() => setShowCart(false)}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <ul className={classes['cart__items']}>
            {cartItems.map((item, id) => (
              <li key={id} className={classes['cart__item']}>
                <img
                  src={
                    item.bgImage.slice(0, 28) +
                    'resize/420/-/' +
                    item.bgImage.slice(28)
                  }
                  alt={item.name + ' Game'}
                  className={classes['item__image']}
                />
                <div className={classes['item__middle']}>
                  <span className={classes['item__name']}>{item.name}</span>
                  <Rating
                    name={item.slug}
                    value={item.rating}
                    precision={0.5}
                    readOnly
                  />
                  <BookmarksButton
                    game={item}
                    prices={cartItemsPrices[id]}
                    styles={{ fontSize: '1rem', ml: '-0.6rem' }}
                  />
                </div>
                <div className={classes['item__right']}>
                  <GamePrice
                    prices={cartItemsPrices[id]}
                    variant="cart__price"
                  />
                  <Button
                    variant="text"
                    startIcon={<HighlightOffRounded />}
                    sx={{
                      alignSelf: 'flex-end',
                      color: 'white',
                      fontSize: '1rem',
                      pl: '1rem',
                      '&:hover': {
                        backgroundColor: 'grey.main',
                      },
                    }}
                    onClick={() => {
                      dispatch(cartSliceActions.remove(item.id));
                      dispatch(
                        toastSliceActions.addInfoToast(
                          'Item Removed from the Cart!'
                        )
                      );
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className={classes['payment']}>
            <div className={classes['payment__total']}>
              <span className={classes['payment__total-text']}>
                Total Price:{' '}
              </span>
              <span className={classes['payment__total-price']}>
                {'$' + totalPriceInCents / 100}
              </span>
            </div>
            <Button
              variant="contained"
              className={classes['payment__btn']}
              onClick={payClickHandler}
              disabled={stripeLoading}
            >
              {stripeLoading ? 'Loading...' : 'Pay with Stripe'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
