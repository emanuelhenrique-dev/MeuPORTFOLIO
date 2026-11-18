import { HeaderContainer, HeaderContent } from './Header.styles';

import logoImg from '/Logo-img.png';

export function Header() {
  return (
    <HeaderContainer>
      <a
        className="linkOut"
        href="https://portfolio-alpha-ten-50.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Portfolio antigo
      </a>
      <HeaderContent>
        <span className="left-effect"></span>
        <img src={logoImg} alt="" />
        <h1 className="logo">MEU PORTFÓLIO</h1>

        <span className="right-effect"></span>
      </HeaderContent>
    </HeaderContainer>
  );
}
