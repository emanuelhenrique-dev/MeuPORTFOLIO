import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: ${(props) => props.theme['base-input']};

  h3 {
    color: ${(props) => props.theme['green-primary']};
  }
`;
