import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CountriesPage from './pages/CountriesPage';
import CountryPage from './pages/CountryPage';

const App = () => {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <CountriesPage />
    },
    {
      path: "/countries/:name",
      element: <CountryPage />
    }
  ]);

  return (
    <RouterProvider router={routes} />
  )
};

export default App;