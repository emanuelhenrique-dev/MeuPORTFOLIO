import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

   :root {
    --max-width: 1120px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

    :focus {
    outline: 0;
  }

    body {
    background: ${(props) => props.theme['base-background']};
    color: ${(props) => props.theme['base-title']};
    -webkit-font-smoothing: antialiased;
    height: 100%;
  }

    *,body, input, textarea, button {
    font-family: "Archivo", sans-serif;
    font-size: 1rem;
    line-height: 160%;
    font-weight: 400;
  }

  a {
    text-decoration: none;
  }
`;
