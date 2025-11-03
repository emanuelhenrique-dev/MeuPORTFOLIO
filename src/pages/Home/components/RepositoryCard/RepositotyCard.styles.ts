import styled from 'styled-components';

export const RepositoryCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 2rem;

  background: ${(props) => props.theme['base-post']};
  border: 1px solid #252529;
  border-radius: 10px;

  max-width: 416px;
  max-height: 260px;

  cursor: pointer;
  .heading {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    line-height: 100%;

    h3 {
      font-weight: 700;
      font-size: 1.25rem;
      line-height: 100%;
    }

    span {
      font-weight: 400;
      font-size: 14px;
      color: ${(props) => props.theme['base-span']};
      min-width: 55px;
    }
  }

  p {
    color: ${(props) => props.theme['base-subtext']};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5; /* número de linhas */
    -webkit-box-orient: vertical;
  }

  &:hover {
    border-color: ${(props) => props.theme['green-primary']};

    h3 {
      color: ${(props) => props.theme['green-primary']};
    }
  }
`;
