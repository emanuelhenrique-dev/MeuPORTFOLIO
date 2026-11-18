import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MainCard } from './components/MainCard/MainCard';
import { HomeContainer, MainProjectsSection, ProfileSection, RepositorySection, SkillsSection } from './Home.styles';
import avatarTemp from '/avatarTemp.png';
import HtmlImage from '../../assets/html.svg?react';
import CssImage from '../../assets/css.svg?react';
import JsImage from '../../assets/js.svg?react';
import TsImage from '../../assets/ts.svg?react';
import ReactImage from '../../assets/react.svg?react';
// import FigmaImage from '../../assets/figma.svg?react';
import { ArrowSquareOutIcon, EnvelopeIcon, GearIcon, GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, WhatsappLogoIcon } from '@phosphor-icons/react';
import { SearchForm } from './components/SearchForm/SearchForm';
import { RepositoryCard } from './components/RepositoryCard/RepositoryCard';
import { useGitHubData } from '../../contexts/GitHubContext/GitHubContext';
import { mainProjects } from '../../data/mains-projects';
import { Pagination } from './components/Pagination/Pagination';
export function Home() {
    const { profile, repos, loading } = useGitHubData();
    const userProfile = {
        name: profile ? profile.name : 'Emanuel Silva',
        login: profile ? profile.login : 'emanuelhenrique-dev',
        avatarUrl: profile ? profile.avatarUrl : avatarTemp,
        bio: profile ? profile.bio : 'Desenvolvedor Front End',
        url: profile ? profile.url : 'https://github.com/emanuelhenrique-dev',
        email: 'emanuelhenriquefs@gmail.com',
        followers: profile ? profile.followers : 0
    };
    return (_jsxs(HomeContainer, { children: [_jsxs(ProfileSection, { children: [_jsx("img", { src: userProfile.avatarUrl, alt: "" }), _jsxs("div", { className: "info-profile", children: [_jsxs("div", { className: "heading", children: [_jsxs("div", { className: "user", children: [_jsx("h2", { children: userProfile.name }), _jsx("span", { children: userProfile.bio })] }), _jsxs("a", { href: userProfile.url, target: "_blank", children: ["github", _jsx(ArrowSquareOutIcon, { size: 12, color: "#97edaa", weight: "bold" })] })] }), _jsx("p", { children: "Sou um desenvolvedor iniciante apaixonado por tecnologia. Tenho conhecimento em HTML, CSS3 e JavaScript, e atualmente estou me especializando em React e TypeScript. Tamb\u00E9m possuo no\u00E7\u00F5es b\u00E1sicas de UI Design e Figma, o que me ajuda a pensar melhor na experi\u00EAncia do usu\u00E1rio. Apesar de ainda n\u00E3o ter experi\u00EAncia profissional, estou em busca da minha primeira oportunidade para colocar em pr\u00E1tica tudo que venho aprendendo e continuar evoluindo como desenvolvedor." }), _jsxs("div", { className: "contacts", children: [_jsxs("a", { href: "https://www.instagram.com/emanuelhfs/", target: "_blank", children: [_jsx(InstagramLogoIcon, { size: 24, color: "#41704e", weight: "bold" }), ' ', "emanuelhfs"] }), _jsxs("div", { children: [_jsx(WhatsappLogoIcon, { size: 24, color: "#41704e" }), "(86) 98120-3145"] }), _jsxs("div", { children: [_jsx(EnvelopeIcon, { size: 24, color: "#41704e" }), " ", userProfile.email] }), _jsxs("a", { href: userProfile.url, target: "_blank", children: [_jsx(GithubLogoIcon, { size: 24, color: "#41704e", weight: "bold" }), ' ', userProfile.login, " ", '•', " ", userProfile.followers, " seguidores"] }), _jsxs("a", { href: "https://www.linkedin.com/in/emanuel-hfsilva/", target: "_blank", children: [_jsx(LinkedinLogoIcon, { size: 24, color: "#41704e", weight: "bold" }), ' ', "emanuel-hfsilva"] })] })] })] }), _jsxs(MainProjectsSection, { children: [_jsx("h3", { children: "Principais Projetos" }), _jsx("div", { className: "list-projects", children: mainProjects.map((project, index) => {
                            return (_jsx(MainCard, { name: project.name, description: project.description, image: project.image, technologies: project.technologies, github: project.github, website: project.website, post_url: project.post_url }, index));
                        }) })] }), _jsxs(SkillsSection, { children: [_jsx("h3", { children: "Habilidades" }), _jsxs("div", { className: "list-skills", children: [_jsx("div", { className: "html", title: "Html", children: _jsx(HtmlImage, {}) }), _jsx("div", { className: "css", title: "Css", children: _jsx(CssImage, {}) }), _jsx("div", { className: "js", title: "JavaScript", children: _jsx(JsImage, {}) }), _jsx("div", { className: "ts", title: "TypeScript", children: _jsx(TsImage, {}) }), _jsx("div", { className: "react", title: "React", children: _jsx(ReactImage, {}) }), _jsx("div", { className: "react-native", title: "React Native", children: _jsx(ReactImage, {}) }), _jsx("div", { className: "figma", title: "Figma" })] })] }), _jsxs(RepositorySection, { children: [_jsx("h3", { children: "Todas Reposit\u00F3rios" }), _jsxs("div", { className: "list-container", children: [_jsx(SearchForm, {}), repos.length > 0 ? (_jsxs("div", { className: "repository-list-wrapper", children: [loading && (_jsx("div", { className: "spinner-overlay", children: _jsx(GearIcon, { size: 128, color: "#97edaa", weight: "fill" }) })), _jsx("div", { className: loading ? 'repository-list loading' : 'repository-list', children: repos.map((repo) => {
                                            return (_jsx(RepositoryCard, { id: repo.id, name: repo.name, description: repo.description, created_at: repo.created_at }, repo.id));
                                        }) })] })) : (_jsx("h3", { children: "Nenhum reposit\u00F3rio encontrado" }))] }), _jsx(Pagination, {})] })] }));
}
