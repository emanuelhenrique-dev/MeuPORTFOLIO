import styled from 'styled-components';

export const HomeContainer = styled.main`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 30px 20px;

  display: flex;
  flex-direction: column;
  gap: 30px;
`;

/////////////////////////// Perfil ///////////////////////////
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
    width: 160px;
    height: 160px;
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
      a {
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

        &:hover {
          filter: brightness(1.4);
        }
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

      div,
      a {
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

  @media (max-width: 630px) {
    flex-direction: column;
    padding: 20px 16px;

    .info-profile {
      .heading .user h2 {
        font-size: 1.6rem;
      }
      p {
        font-size: 0.875rem;
      }
    }
  }
`;

/////////////////////////// Principais projetos ///////////////////////////
export const MainProjectsSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 18px;

  > h3 {
    font-weight: 400;
    font-size: 32px;
    line-height: 160%;

    color: ${(props) => props.theme['green-primary']};
  }

  .list-projects {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 420px));
    gap: 20px;
    justify-content: center;
  }
`;

/////////////////////////// Habilidades ///////////////////////////
export const SkillsSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 18px;

  > h3 {
    font-weight: 400;
    font-size: 32px;
    line-height: 160%;

    color: ${(props) => props.theme['green-primary']};
  }

  .list-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    justify-content: center;

    max-width: 750px;

    div {
      width: 163px;
      height: 137px;

      background: ${(props) => props.theme['base-input']};
      border: 1px solid #1f1f1f;

      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        &.html svg path {
          fill: #ea5d00;
        }
        &.css svg path {
          fill: #2196f3;
        }
        &.js svg path {
          fill: #f7df1e;
        }
        &.ts svg path:nth-child(1) {
          fill: #3178c6;
        }
        &.react svg path {
          fill: #087ea4;
        }
      }

      &.figma {
        background-image: url('/figma.svg');
        background-repeat: no-repeat;
        background-position: center;

        &:hover {
          background-image: url('/figma3.svg');
          background-size: 90px;
        }
      }
    }
  }

  @media (max-width: 630px) {
  }
`;
///////////////////////////  repositório  ///////////////////////////
export const RepositorySection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 18px;

  > h3 {
    font-weight: 400;
    font-size: 32px;
    line-height: 160%;

    color: ${(props) => props.theme['green-primary']};
  }

  .list-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .repository-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 416px));
    gap: 32px;
    justify-content: center;
  }
`;
