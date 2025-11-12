import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  button {
    cursor: pointer;
    color: ${(props) => props.theme['base-title']};
  }

  .prev,
  .next {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5.61664px;
    padding: 4px 8px;

    background: #1c412a;
    color: ${(props) => props.theme['base-title']};
    border: 1px solid #1c412a;

    &:hover {
      color: ${(props) => props.theme['base-background']};
      background-color: #97edaa;
    }

    &:disabled {
      color: ${(props) => props.theme['base-subtext']};
      background: transparent;
      border: 1px solid ${(props) => props.theme['base-subtext']};
      opacity: 0.4;
      cursor: default;
    }
  }

  .pagination-buttons {
    display: flex;
    gap: 2;
    button {
      width: 30px;
      height: 30px;
      background: transparent;
      border-radius: 5px;
      border: none;

      &.active {
        background: #1c412a;
      }

      &:hover {
        color: ${(props) => props.theme['base-background']};
        background-color: #97edaa;
      }
    }
  }
`;
