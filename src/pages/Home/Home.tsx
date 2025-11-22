import { SVGImage } from '../../util/SvgImage';
import { MainCard } from './components/MainCard/MainCard';
import {
  HomeContainer,
  MainProjectsSection,
  ProfileSection,
  RepositorySection,
  SkillsSection
} from './Home.styles';

import avatarTemp from '/avatarTemp.png';
import cssImage from '/css.svg';
import htmlImage from '/html.svg';
import jsImage from '/js.svg';
import tsImage from '/ts.svg';
import reactImage from '/react.svg';
// import figmaImage from '/figma.svg';

import {
  ArrowSquareOutIcon,
  EnvelopeIcon,
  GearIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  WhatsappLogoIcon
} from '@phosphor-icons/react';
import { SearchForm } from './components/SearchForm/SearchForm';
import { RepositoryCard } from './components/RepositoryCard/RepositoryCard';
import {
  useGitHubData,
  type GitHubProfile
} from '../../contexts/GitHubContext/GitHubContext';
import { mainProjects } from '../../data/mains-projects';
import { Pagination } from './components/Pagination/Pagination';

export function Home() {
  const { profile, repos, loading } = useGitHubData();

  const userProfile: GitHubProfile = {
    name: profile ? profile.name : 'Emanuel Silva',
    login: profile ? profile.login : 'emanuelhenrique-dev',
    avatarUrl: profile ? profile.avatarUrl : avatarTemp,
    bio: profile ? profile.bio : 'Desenvolvedor Front End',
    url: profile ? profile.url : 'https://github.com/emanuelhenrique-dev',
    email: profile ? profile.email : 'emanuelhenriquefs@gmail.com',
    followers: { totalCount: profile ? profile.followers.totalCount : 0 }
  };

  return (
    <HomeContainer>
      <ProfileSection>
        <img src={userProfile.avatarUrl} alt="" />
        <div className="info-profile">
          <div className="heading">
            <div className="user">
              <h2>{userProfile.name}</h2>
              <span>{userProfile.bio}</span>
            </div>
            <a href={userProfile.url} target="_blank">
              github
              <ArrowSquareOutIcon size={12} color="#97edaa" weight="bold" />
            </a>
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
            <a href="https://www.instagram.com/emanuelhfs/" target="_blank">
              <InstagramLogoIcon size={24} color="#41704e" weight="bold" />{' '}
              emanuelhfs
            </a>
            <div>
              <WhatsappLogoIcon size={24} color="#41704e" />
              (86) 98120-3145
            </div>
            <div>
              <EnvelopeIcon size={24} color="#41704e" /> {userProfile.email}
            </div>
            <a href={userProfile.url} target="_blank">
              <GithubLogoIcon size={24} color="#41704e" weight="bold" />{' '}
              {userProfile.login} {'•'} {userProfile.followers.totalCount}{' '}
              seguidores
            </a>
            <a
              href="https://www.linkedin.com/in/emanuel-hfsilva/"
              target="_blank"
            >
              <LinkedinLogoIcon size={24} color="#41704e" weight="bold" />{' '}
              emanuel-hfsilva
            </a>
          </div>
        </div>
      </ProfileSection>
      <MainProjectsSection>
        <h3>Principais Projetos</h3>
        <div className="list-projects">
          {mainProjects.map((project, index) => {
            return (
              <MainCard
                key={index}
                name={project.name}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                github={project.github}
                website={project.website}
                post_url={project.post_url}
              />
            );
          })}
        </div>
      </MainProjectsSection>
      <SkillsSection>
        <h3>Habilidades</h3>
        <div className="list-skills">
          <div className="html" title="Html">
            <SVGImage src={htmlImage} alt="html" />
          </div>
          <div className="css" title="Css">
            <SVGImage src={cssImage} alt="css" />
          </div>
          <div className="js" title="JavaScript">
            <SVGImage src={jsImage} alt="js" />
          </div>
          <div className="ts" title="TypeScript">
            <SVGImage src={tsImage} alt="ts" />
          </div>
          <div className="react" title="React">
            <SVGImage src={reactImage} alt="react" />
          </div>
          <div className="figma" title="Figma">
            {/* <SVGImage src={figmaImage} alt="figma" /> */}
          </div>
        </div>
      </SkillsSection>
      <RepositorySection>
        <h3>Todas Repositórios</h3>
        <div className="list-container">
          <SearchForm />

          {repos.length > 0 ? (
            <div className="repository-list-wrapper">
              {loading && (
                <div className="spinner-overlay">
                  <GearIcon size={128} color="#97edaa" weight="fill" />
                </div>
              )}
              <div
                className={
                  loading ? 'repository-list loading' : 'repository-list'
                }
              >
                {repos.map((repo) => {
                  return (
                    <RepositoryCard
                      id={repo.id}
                      name={repo.name}
                      key={repo.id}
                      description={repo.description}
                      created_at={repo.created_at}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <h3>Nenhum repositório encontrado</h3>
          )}
        </div>
        <Pagination />
      </RepositorySection>
    </HomeContainer>
  );
}
