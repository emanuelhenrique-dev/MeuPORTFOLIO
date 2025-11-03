import { createBrowserRouter } from 'react-router-dom';
import { Home } from './Home/Home';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Post } from './Post/Post';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/post',
        element: <Post />
      }
    ]
  }
]);
