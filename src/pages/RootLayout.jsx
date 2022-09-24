import { Outlet } from 'react-router-dom';

import classes from './RootLayout.module.css';

import { Header } from '../layouts/Header';
import { Sidebar } from '../layouts/Sidebar';

export const RootLayout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className={classes['main-content']}>
        <Outlet />
      </main>
    </>
  );
};
