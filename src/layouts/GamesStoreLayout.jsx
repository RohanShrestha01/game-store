import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge, Fab, Drawer, useMediaQuery } from '@mui/material';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

import { GameOverlay } from '../components/GamesStore/Overlays/GameOverlay';
import { StyledTooltip } from '../styles/StyledTooltip';
import { Cart } from '../components/GamesStore/Overlays/Cart';

export const GamesStoreLayout = () => {
  const [showCart, setShowCart] = useState(false);
  const cartItemsNum = useSelector(state => state.cart.cartItems.length);
  const matches = useMediaQuery('(max-width: 600px)');
  const matches1200 = useMediaQuery('(max-width: 1200px)');
  const matches1000 = useMediaQuery('(max-width: 1000px)');

  const cartBottomPosition = matches ? '8rem' : '1.8rem';
  const drawerWidth = matches
    ? '85vw'
    : matches1000
    ? '65vw'
    : matches1200
    ? '45vw'
    : '40vw';

  return (
    <>
      <GameOverlay />
      {!showCart && (
        <StyledTooltip title="Show Cart" placement="top">
          <Fab
            color="primary"
            aria-label="cart"
            size="large"
            sx={{
              position: 'fixed',
              right: '1.8rem',
              bottom: cartBottomPosition,
              zIndex: '12',
            }}
            onClick={() => setShowCart(true)}
          >
            <Badge
              badgeContent={cartItemsNum}
              overlap="circular"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '1rem',
                  color: 'common.white',
                  bgcolor: 'common.black.light',
                },
              }}
            >
              <ShoppingCartRoundedIcon fontSize="large" />
            </Badge>
          </Fab>
        </StyledTooltip>
      )}
      <Drawer
        anchor="right"
        open={showCart}
        onClose={() => setShowCart(false)}
        PaperProps={{
          sx: { backgroundColor: 'common.black.dark', width: drawerWidth },
        }}
      >
        <Cart setShowCart={setShowCart} />
      </Drawer>
      <Outlet />
    </>
  );
};
