import styled from 'styled-components';

export const PostContainer = styled.main`
  flex: 1;

  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 30px 20px;
`;

export const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 32px;

  margin-top: -100px;

  background-color: ${(props) => props.theme['base-profile']};
  box-shadow: 0px 2px 28px rgba(151, 237, 170, 0.2);
  border-radius: 10px;

  .top-heading {
    display: flex;
    justify-content: space-between;

    button,
    a {
      font-weight: 700;
      font-size: 12px;
      line-height: 100%;
      text-transform: uppercase;
      color: ${(props) => props.theme['green-primary']};

      background-color: transparent;
      border: none;

      cursor: pointer;

      display: flex;
      align-items: center;
      gap: 8px;

      &:hover {
        filter: brightness(1.4);
      }
    }

    a svg {
      margin-bottom: 2px;
    }
  }

  .post-info {
    display: flex;
    flex-direction: column;
    gap: 8px;

    h2 {
      font-weight: 700;
      font-size: 1.5rem;
      line-height: 130%;
    }

    .info {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;

        font-weight: 400;
        font-size: 1rem;

        color: ${(props) => props.theme['base-span']};

        a {
          color: ${(props) => props.theme['base-span']};

          &:hover {
            filter: brightness(1.4);
          }
        }
      }
    }
  }

  //loading

  @keyframes loading {
    0% {
      filter: brightness(1);
    }
    100% {
      filter: brightness(1.2);
    }
  }

  &.loading {
    animation: loading 1s ease-in-out;
    * {
      opacity: 0 !important;
    }
  }
`;

export const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 32px;
  gap: 16px;
  position: relative;

  color: ${(props) => props.theme['base-subtext']};

  p {
    font-weight: 700;
    font-size: 1rem;
    line-height: 160%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${(props) => props.theme['base-title']};
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  a {
    color: ${(props) => props.theme['green-primary']};
    text-decoration: underline;
  }

  ul {
    padding-left: 1.5rem;
  }

  @media (max-width: 450px) {
    padding: 16px 12px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .spinner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    animation: spin 3s linear infinite;
  }
`;
