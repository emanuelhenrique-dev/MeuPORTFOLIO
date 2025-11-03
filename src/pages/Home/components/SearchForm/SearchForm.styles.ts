import styled from 'styled-components';

export const SearchFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;

  span {
    font-size: 0.875rem;
    color: ${(props) => props.theme['base-span']};
  }

  input {
    width: 100%;
    padding: 12px;

    background: #101010;
    border: 1px solid ${(props) => props.theme['base-border']};
    border-radius: 6px;

    color: ${(props) => props.theme['green-primary']};

    &::placeholder {
      color: ${(props) => props.theme['base-label']};
    }
  }
`;
