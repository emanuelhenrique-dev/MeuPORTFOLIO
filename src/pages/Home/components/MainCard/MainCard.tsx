import { CardInfo, MainCardContainer, Tag } from './MainCard.styles';

interface MainCardProps {
  name: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  website: string;
  post_url: string;
}

export function MainCard({
  name,
  description,
  image,
  technologies,
  github,
  website,
  post_url
}: MainCardProps) {
  return (
    <MainCardContainer>
      <CardInfo to={post_url} title={description}>
        <div className="img-wrapper">
          <img src={image} alt="" />
        </div>
        <h3>{name}</h3>
        <div className="tags">
          {technologies.map((technology, index) => {
            return (
              <Tag
                key={index}
                $tag={
                  technology as 'css' | 'js' | 'html' | 'figma' | 'react' | 'ts'
                }
              >
                {technology}
              </Tag>
            );
          })}
        </div>
      </CardInfo>
      <div className="buttons">
        <a href={website} target="_blank">
          Acessar Projeto
        </a>
        <a href={github} target="_blank">
          Repositório
        </a>
      </div>
    </MainCardContainer>
  );
}
