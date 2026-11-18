import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// imports react router
import { useNavigate, useParams } from 'react-router-dom';
//styles
import { HeadingContainer, PostContainer, PostContent } from './Post.styles';
import { ArrowSquareOutIcon, CalendarBlankIcon, CaretLeftIcon, ChatCircleDotsIcon, GearIcon, GithubLogoIcon, LinkIcon } from '@phosphor-icons/react';
// imports components and utils
import { useGitHubData } from '../../contexts/GitHubContext/GitHubContext';
import { formatProjectDate } from '../../util/formatters';
// imports react
import { useEffect, useState } from 'react';
// imports bibliotecas
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
export function Post() {
    const navigate = useNavigate();
    const { owner, repo } = useParams();
    const { username, getRepo, fetchRepoCommentCount } = useGitHubData();
    // const token = import.meta.env.VITE_GITHUB_TOKEN;
    const [repositoryComments, setRepositoryComments] = useState(null);
    const [repositoryReadme, setRepositoryReadme] = useState('');
    const [repoLoading, setRepoLoading] = useState(false);
    const [repository, setRepository] = useState(null);
    useEffect(() => {
        if (!owner || !repo)
            return;
        async function loadRepo() {
            setRepoLoading(true);
            try {
                const data = await getRepo(owner, repo);
                setRepository(data);
            }
            finally {
                setRepoLoading(false);
            }
        }
        loadRepo();
    }, [owner, repo, getRepo]);
    useEffect(() => {
        if (!repository || !repository.name || !username)
            return; // garante que temos dados antes de buscar
        const fetchReadme = async () => {
            setRepoLoading(true);
            try {
                // Busca comentários
                const commentsCount = await fetchRepoCommentCount(repository.name);
                setRepositoryComments(commentsCount);
                // console.log(username);
                // console.log(repository.name);
                // Busca README
                const response = await axios.get('/api/github/readme', {
                    params: { owner: username, repo: repository.name }
                });
                setRepositoryReadme(response.data.content);
            }
            catch (error) {
                console.error('Erro ao buscar detalhes do repositório:', error);
                setRepositoryReadme('');
                setRepositoryComments(0);
            }
            finally {
                setRepoLoading(false);
            }
        };
        fetchReadme();
    }, [repository, username, fetchRepoCommentCount]);
    return (_jsx(PostContainer, { children: repository ? (_jsxs(_Fragment, { children: [_jsxs(HeadingContainer, { className: repoLoading ? 'loading' : '', children: [_jsxs("div", { className: "top-heading", children: [_jsxs("button", { onClick: () => navigate('/'), children: [_jsx(CaretLeftIcon, { size: 16, color: "#97edaa", weight: "bold" }), "voltar"] }), _jsxs("a", { href: repository?.html_url, target: "_blank", rel: "noopener noreferrer", children: ["ver no github", _jsx(ArrowSquareOutIcon, { size: 14, color: "#97edaa", weight: "bold" })] })] }), _jsxs("div", { className: "post-info", children: [_jsx("h2", { children: repository?.name }), _jsxs("div", { className: "info", children: [_jsxs("span", { children: [_jsx(GithubLogoIcon, { size: 20, color: "#41704e", weight: "bold" }), ' ', _jsx("a", { href: repository?.owner?.html_url, target: "_blank", rel: "noopener noreferrer", children: repository?.owner?.login })] }), _jsxs("span", { children: [_jsx(CalendarBlankIcon, { size: 20, color: "#41704E" }), repository?.created_at
                                                    ? formatProjectDate(new Date(repository.created_at))
                                                    : ''] }), _jsxs("span", { children: [_jsx(ChatCircleDotsIcon, { size: 20, color: "#41704e", weight: "fill" }), ' ', repositoryComments ?? '0', " coment\u00E1rios"] }), _jsx("span", { children: repository?.homepage ? (_jsxs(_Fragment, { children: [_jsx(LinkIcon, { size: 20, color: "#41704e" }), _jsx("a", { href: repository.homepage, target: "_blank", children: repository.homepage })] })) : null })] })] })] }), _jsxs(PostContent, { children: [repoLoading && (_jsx("div", { className: "spinner-overlay", children: _jsx(GearIcon, { size: 128, color: "#97edaa", weight: "fill" }) })), _jsx(ReactMarkdown, { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeRaw], components: {
                                code({ className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return match ? (_jsx(SyntaxHighlighter, { language: match[1], style: vscDarkPlus, children: String(children).replace(/\n$/, '') })) : (_jsx("code", { className: className, ...props, children: children }));
                                },
                                img({ src, width, alt }) {
                                    return src?.includes('.github') ? (_jsx("img", { src: `https://raw.githubusercontent.com/${username}/${repository?.name}/refs/heads/main/${src}`, width: width, alt: alt })) : (_jsx("img", { src: src, width: width, alt: alt }));
                                },
                                a({ href, children }) {
                                    return (_jsx("a", { href: href, target: "_blank", rel: "noopener noreferrer", children: children }));
                                }
                            }, children: repositoryReadme })] })] })) : (_jsxs(HeadingContainer, { className: repoLoading ? 'loading' : '', children: [_jsx("div", { className: "top-heading", children: _jsxs("button", { onClick: () => navigate('/'), children: [_jsx(CaretLeftIcon, { size: 16, color: "#97edaa", weight: "bold" }), "voltar"] }) }), _jsx("div", { className: "post-info", children: _jsx("h2", { children: "Reposit\u00F3rio inexistente ou n\u00E3o encontrado" }) })] })) }));
}
