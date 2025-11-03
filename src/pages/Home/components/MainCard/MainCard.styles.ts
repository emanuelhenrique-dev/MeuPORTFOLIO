import styled from 'styled-components';

export const MainCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  .buttons {
    display: flex;
    gap: 5px;

    button {
      width: 100%;
      padding: 3px 5px;

      background-color: ${(props) => props.theme['green-primary']};
      border: 2px solid ${(props) => props.theme['green-primary']};
      border-radius: 4px;

      cursor: pointer;
    }

    button:nth-child(2) {
      background-color: transparent;
      color: ${(props) => props.theme['green-primary']};
    }

    button:hover {
      background-color: #aee9bbff;
      color: #579c66ff;
      border: 1px solid ${(props) => props.theme['green-primary']};
    }
  }

  &:hover {
    .img-wrapper img {
      transform: scale(1.1);
    }
  }
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  .img-wrapper {
    width: 100%;
    max-height: 176px;
    overflow: hidden;

    border: 1px solid #1f1f1f;
    border-radius: 5px;

    img {
      width: 100%;
      object-fit: cover;
      vertical-align: middle;

      transition: 0.4s;
    }
  }

  h3 {
    font-weight: 500;
    font-size: 22px;
    line-height: 24px;
  }

  .tags {
    display: flex;
    gap: 5px;
  }
`;

interface tagVariant {
  $tag: 'css' | 'js' | 'html' | 'figma';
}

export const Tag = styled.span<tagVariant>`
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  text-transform: uppercase;

  padding: 2px 3px;
  background-color: #0b0909;
  border-radius: 5px;

  color: ${({ $tag }) =>
    $tag === 'css'
      ? '#0277BD'
      : $tag === 'js'
      ? '#D8C232'
      : $tag === 'html'
      ? '#E14E1D'
      : '#C11574'};
`;
