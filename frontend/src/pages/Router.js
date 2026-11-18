import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter } from 'react-router-dom';
import { Home } from './Home/Home';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Post } from './Post/Post';
export const Router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(DefaultLayout, {}),
        children: [
            {
                index: true,
                element: _jsx(Home, {})
            },
            {
                path: '/post/:owner/:repo',
                element: _jsx(Post, {})
            }
        ]
    }
]);
