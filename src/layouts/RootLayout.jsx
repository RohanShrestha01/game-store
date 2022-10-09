import { Outlet } from 'react-router-dom';

import classes from './RootLayout.module.css';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ScrollToTop } from '../utils/ScrollToTop';

export const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Sidebar />
      <main className={classes['main-content']}>
        <Outlet />
      </main>
    </>
  );
};
