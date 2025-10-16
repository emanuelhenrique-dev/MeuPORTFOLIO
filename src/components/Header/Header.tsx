import { HeaderContainer, HeaderContent } from './Header.styles';

import logoImg from '/Logo-img.png';

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <span className="left-effect"></span>

        <img src={logoImg} alt="" />
        <h1 className="logo">MEU PORTFÓLIO</h1>

        <span className="right-effect"></span>
      </HeaderContent>
    </HeaderContainer>
  );
}
