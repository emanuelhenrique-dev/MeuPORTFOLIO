import styled, { keyframes } from 'styled-components';

const lightSweep = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`;

export const HeaderContainer = styled.header`
  position: relative;
  padding: 4rem 0 8.3125rem;
  background: radial-gradient(
    circle,
    rgba(23, 23, 26, 1) 54%,
    rgba(141, 201, 155, 0.5) 482%
  );
  overflow: hidden;
  z-index: -1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -50%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(85, 121, 103, 0.1) 50%,
      transparent 100%
    );
    animation: ${lightSweep} 6s ease-in-out infinite;
    z-index: 2;
    pointer-events: none;
  }
  background-color: ${(props) => props.theme['base-post']};

  .left-effect {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: min(409px, 30%);
    height: 100%;
    background: url(/left_effect.png);
    background-repeat: no-repeat;
    background-position-x: right;
    background-position-y: 70px;
  }

  .right-effect {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: min(371px, 30%);
    height: 100%;
    background: url(/right_effect.png);
    background-repeat: no-repeat;
    background-position-x: left;
    background-position-y: center;
  }
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;

  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 160%;
    /* or 38px */

    color: ${(props) => props.theme['green-primary']};
  }
`;
