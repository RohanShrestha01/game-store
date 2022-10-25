import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert, Slide } from '@mui/material';

import classes from './RootLayout.module.css';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ScrollToTop } from '../utils/ScrollToTop';
import { toastSliceActions } from '../store/toastSlice';

export const RootLayout = () => {
  const toast = useSelector(state => state.toast);
  const dispatch = useDispatch();

  const handleToastClose = (_e, reason) => {
    if (reason === 'clickaway') return;
    dispatch(toastSliceActions.hideToast());
  };

  return (
    <>
      <ScrollToTop />
      <Header />
      <Sidebar />
      <main className={classes['main-content']}>
        <Outlet />
      </main>
      <Snackbar
        open={toast.show}
        autoHideDuration={1000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={Slide}
        TransitionProps={{
          onExited: () => dispatch(toastSliceActions.resetActiveToast()),
        }}
      >
        <Alert
          onClose={handleToastClose}
          severity={toast.active?.type}
          variant="filled"
          color={toast.active?.type === 'success' ? 'success' : 'error'}
          sx={{ '& .MuiAlert-message': { fontSize: '1.2rem' } }}
        >
          {toast.active?.message}
        </Alert>
      </Snackbar>
    </>
  );
};
