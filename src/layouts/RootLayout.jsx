import { Outlet } from 'react-router-dom';

import classes from './RootLayout.module.css';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

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
