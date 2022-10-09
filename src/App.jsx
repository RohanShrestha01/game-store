import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { theme } from './styles/theme';

import { RootLayout } from './layouts/RootLayout';
import { GameStore } from './pages/GameStore';
import { PageNotFound } from './pages/PageNotFound';
import { GamesCategory } from './pages/GamesCategory';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      networkMode: 'always',
      refetchOnReconnect: true,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Navigate to="store" replace />} />
      <Route path="store" element={<Navigate to="games" replace />} />
      <Route path="store/games" element={<GameStore />} />
      <Route path="store/games/:category" element={<GamesCategory />} />
      <Route path="store/movies" element={<h1>Movies Store</h1>} />
      <Route path="store/music" element={<h1>Music Store</h1>} />
      <Route path="store/apps" element={<h1>Apps Store</h1>} />
      <Route path="home" element={<h1>Home</h1>} />
      <Route path="games" element={<h1>Games</h1>} />
      <Route path="movies" element={<h1>Movies</h1>} />
      <Route path="music" element={<h1>Music</h1>} />
      <Route path="bookmarks" element={<h1>Bookmarks</h1>} />
      <Route path="settings" element={<h1>Settings</h1>} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={true} />
        </StyledEngineProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
