import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { RouterProvider } from 'react-router-dom';
import { Router } from './pages/Router';
import { GitHubProvider } from './contexts/GitHubContext/GitHubContext';
export function App() {
    return (_jsxs(ThemeProvider, { theme: defaultTheme, children: [_jsx(GlobalStyle, {}), _jsx(GitHubProvider, { children: _jsx(RouterProvider, { router: Router }) })] }));
}
