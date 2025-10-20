import styled from 'styled-components';

export const HomeContainer = styled.main`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 30px 20px;
`;

export const ProfileSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;

  padding: 40px 32px;
  margin-top: -100px;

  background-color: ${(props) => props.theme['base-profile']};
  box-shadow: 0px 2px 28px rgba(151, 237, 170, 0.2);
  border-radius: 10px;

  img {
    flex: 0;
    border-radius: 50%;
    border: 1px solid #1f1f1f;
  }

  .info-profile {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .heading {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .user {
        h2 {
          font-weight: 400;
          font-size: 2rem;
          line-height: 2.1875rem;
          color: ${(props) => props.theme['green-primary']};
        }
        span {
          font-weight: 400;
          font-size: 0.875rem;
          line-height: 160%;
          color: ${(props) => props.theme['base-span']};
        }
      }

      //link github
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;

        font-weight: 700;
        font-size: 0.75rem;
        line-height: 100%;
        text-transform: uppercase;

        color: ${(props) => props.theme['green-primary']};

        svg {
          line-height: 0;
        }

        cursor: pointer;
      }
    }

    //Descrição
    p {
      font-weight: 400;
      font-size: 15px;
      color: ${(props) => props.theme['base-title']};
    }

    .contacts {
      display: flex;
      flex-wrap: wrap;
      gap: 7px 18px;

      div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;

        font-weight: 400;
        font-size: 16px;
        color: ${(props) => props.theme['base-subtitle']};

        cursor: pointer;

        &:hover {
          color: ${(props) => props.theme['base-title']};
          svg path {
            fill: ${(props) => props.theme['green-primary']};
          }
        }
      }
    }
  }
`;

export const MainProjectsSection = styled.section``;
export const SkillsSection = styled.section``;
export const RepositorySection = styled.section``;
