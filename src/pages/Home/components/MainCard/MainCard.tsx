import { CardInfo, MainCardContainer, Tag } from './MainCard.styles';
import projectImg from '/projectImg.png';

export function MainCard() {
  return (
    <MainCardContainer>
      <CardInfo>
        <div className="img-wrapper">
          <img src={projectImg} alt="" />
        </div>
        <h3>JavaScript data types and data structures</h3>
        <div className="tags">
          <Tag $tag="css">css</Tag>
          <Tag $tag="js">js</Tag>
          <Tag $tag="html">Html</Tag>
          <Tag $tag="figma">figma</Tag>
        </div>
      </CardInfo>
      <div className="buttons">
        <button>Acessar Projeto</button>
        <button>Repositório</button>
      </div>
    </MainCardContainer>
  );
}
