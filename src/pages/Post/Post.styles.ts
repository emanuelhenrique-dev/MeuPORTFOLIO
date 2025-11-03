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
      gap: 16px;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;

        font-weight: 400;
        font-size: 1rem;

        color: ${(props) => props.theme['base-span']};
      }
    }
  }
`;

export const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 32px;
  gap: 16px;

  p {
    font-weight: 700;
    font-size: 1rem;
    line-height: 160%;

    color: ${(props) => props.theme['base-subtext']};
  }

  span {
    padding: 1rem;
    background: #1e2320;
    border-radius: 2px;
  }
`;
