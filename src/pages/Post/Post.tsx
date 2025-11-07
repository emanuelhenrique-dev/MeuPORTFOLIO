import { useNavigate, useParams } from 'react-router-dom';
import { HeadingContainer, PostContainer, PostContent } from './Post.styles';
import {
  ArrowSquareOutIcon,
  CalendarBlankIcon,
  CaretLeftIcon,
  ChatCircleDotsIcon,
  GithubLogoIcon
} from '@phosphor-icons/react';
import { useGitHubData } from '../../contexts/GitHubContext/GitHubContext';
import { formatProjectDate } from '../../util/formatters';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function Post() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { username, repos, fetchRepoCommentCount } = useGitHubData();

  const repository = repos.find((repo) => repo.id === Number(id));
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const [repositoryComments, setRepositoryComments] = useState<number | null>(
    null
  );
  const [repositoryReadme, setRepositoryReadme] = useState('');

  const fetchRepoReadme = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${username}/${repository?.name}/readme`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined
        }
      );
      const content = new TextDecoder('utf-8').decode(
        Uint8Array.from(atob(response.data.content), (c) => c.charCodeAt(0))
      );

      setRepositoryReadme(content);
    } catch (error) {
      console.error('Erro ao buscar o README do repositório:', error);
      setRepositoryReadme('');
    }
  }, [repository, username, token]);

  useEffect(() => {
    if (!repository) return;

    const repoName = repository.name;

    async function loadComments() {
      const count = await fetchRepoCommentCount(repoName);
      setRepositoryComments(count);
    }

    loadComments();
    fetchRepoReadme();
  }, [repository, fetchRepoCommentCount, fetchRepoReadme]);

  return (
    <PostContainer>
      {repository ? (
        <>
          <HeadingContainer>
            <div className="top-heading">
              <button onClick={() => navigate('/')}>
                <CaretLeftIcon size={16} color="#97edaa" weight="bold" />
                voltar
              </button>
              <a href={repository.html_url} target="_blank">
                ver no github
                <ArrowSquareOutIcon size={14} color="#97edaa" weight="bold" />
              </a>
            </div>
            <div className="post-info">
              <h2>{repository.name}</h2>
              <div className="info">
                <span>
                  <GithubLogoIcon size={20} color="#41704e" weight="bold" />{' '}
                  <a href={repository.owner.html_url} target="_blank">
                    {repository.owner.login}
                  </a>
                </span>
                <span>
                  <CalendarBlankIcon size={20} color="#41704E" />
                  {formatProjectDate(new Date(repository.created_at))}
                </span>
                <span>
                  <ChatCircleDotsIcon size={20} color="#41704e" weight="fill" />{' '}
                  {repositoryComments ? repositoryComments : '0'} comentários
                </span>
              </div>
            </div>
          </HeadingContainer>
          <PostContent>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <SyntaxHighlighter language={match[1]} style={vscDarkPlus}>
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                img({ src, width, alt }) {
                  const match = src;
                  return match?.includes('.github') ? (
                    <img
                      src={`https://raw.githubusercontent.com/${username}/${repository.name}/refs/heads/main/${match}`}
                      width={width}
                      alt={alt}
                    />
                  ) : (
                    <img src={src} width={width} alt={alt} />
                  );
                },
                a({ href, children }) {
                  return (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  );
                }
              }}
            >
              {repositoryReadme}
            </ReactMarkdown>
          </PostContent>
        </>
      ) : (
        <>
          <HeadingContainer>
            <div className="top-heading">
              <button onClick={() => navigate('/')}>
                <CaretLeftIcon size={16} color="#97edaa" weight="bold" />
                voltar
              </button>
            </div>
            <div className="post-info">
              <h2>Repositório inexistente ou não encontrado</h2>
            </div>
          </HeadingContainer>
        </>
      )}
    </PostContainer>
  );
}
