import { createBrowserRouter } from 'react-router-dom';
import { Home } from './Home/Home';
import { DefaultLayout } from '../layouts/DefaultLayout';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
]);
