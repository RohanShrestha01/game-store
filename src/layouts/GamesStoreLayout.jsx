import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge, Fab, Drawer } from '@mui/material';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

import { GameOverlay } from '../components/GamesStore/Overlays/GameOverlay';
import { StyledTooltip } from '../styles/StyledTooltip';
import { Cart } from '../components/GamesStore/Overlays/Cart';

export const GamesStoreLayout = () => {
  const [showCart, setShowCart] = useState(false);
  const cartItemsNum = useSelector(state => state.cart.cartItems.length);

  return (
    <>
      <GameOverlay />
      {!showCart && (
        <StyledTooltip title="Show Cart" placement="top">
          <Fab
            color="primary"
            aria-label="cart"
            size="large"
            sx={{ position: 'fixed', right: '1.8rem', bottom: '1.8rem' }}
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
          sx: { backgroundColor: 'common.black.dark', width: '35vw' },
        }}
      >
        <Cart setShowCart={setShowCart} />
      </Drawer>
      <Outlet />
    </>
  );
};
