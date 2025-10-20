import {
  HomeContainer,
  MainProjectsSection,
  ProfileSection,
  RepositorySection,
  SkillsSection
} from './Home.styles';

import avatarTemp from '/avatarTemp.png';

import {
  ArrowSquareOutIcon,
  EnvelopeIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  WhatsappLogoIcon
} from '@phosphor-icons/react';

export function Home() {
  return (
    <HomeContainer>
      <ProfileSection>
        <img src={avatarTemp} alt="" />
        <div className="info-profile">
          <div className="heading">
            <div className="user">
              <h2>Emanuel Silva</h2>
              <span>Desenvolvedor Front End</span>
            </div>
            <span>
              github
              <ArrowSquareOutIcon size={12} color="#97edaa" weight="bold" />
            </span>
          </div>
          <p>
            Sou um desenvolvedor iniciante apaixonado por tecnologia. Tenho
            conhecimento em HTML, CSS3 e JavaScript, e atualmente estou me
            especializando em React e TypeScript. Também possuo noções básicas
            de UI Design e Figma, o que me ajuda a pensar melhor na experiência
            do usuário. Apesar de ainda não ter experiência profissional, estou
            em busca da minha primeira oportunidade para colocar em prática tudo
            que venho aprendendo e continuar evoluindo como desenvolvedor.
          </p>
          <div className="contacts">
            <div>
              <InstagramLogoIcon size={32} color="#41704e" weight="bold" />{' '}
              emanuelhfs
            </div>
            <div>
              <WhatsappLogoIcon size={32} color="#41704e" /> (14) 99999-9999
            </div>
            <div>
              <EnvelopeIcon size={32} color="#41704e" />{' '}
              emanuelhenriquefs@gmail.com
            </div>
            <div>
              <GithubLogoIcon size={32} color="#41704e" weight="bold" />{' '}
              emanuelhenrique-dev {'•'} 14 seguidores
            </div>
            <div>
              <LinkedinLogoIcon size={32} color="#41704e" weight="bold" />{' '}
              emanuel-hfsilva
            </div>
          </div>
        </div>
      </ProfileSection>
      <MainProjectsSection></MainProjectsSection>
      <SkillsSection></SkillsSection>
      <RepositorySection></RepositorySection>
    </HomeContainer>
  );
}
