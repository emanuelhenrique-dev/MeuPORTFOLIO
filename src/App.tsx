import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { RouterProvider } from 'react-router-dom';
import { Router } from './pages/Router';
import { GitHubProvider } from './contexts/GitHubContext/GitHubContext';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <GitHubProvider>
        <RouterProvider router={Router} />
      </GitHubProvider>
    </ThemeProvider>
  );
}
