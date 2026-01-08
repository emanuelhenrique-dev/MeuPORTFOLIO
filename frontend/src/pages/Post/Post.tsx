// imports react router
import { useNavigate, useParams } from 'react-router-dom';

//styles
import { HeadingContainer, PostContainer, PostContent } from './Post.styles';
import {
  ArrowSquareOutIcon,
  CalendarBlankIcon,
  CaretLeftIcon,
  ChatCircleDotsIcon,
  GearIcon,
  GithubLogoIcon
} from '@phosphor-icons/react';

// imports components and utils
import {
  useGitHubData,
  type GitHubRepo
} from '../../contexts/GitHubContext/GitHubContext';
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
  const { id } = useParams();
  const { username, getRepoById, fetchRepoCommentCount } = useGitHubData();

  // const token = import.meta.env.VITE_GITHUB_TOKEN;

  const [repositoryComments, setRepositoryComments] = useState<number | null>(
    null
  );
  const [repositoryReadme, setRepositoryReadme] = useState('');
  const [repoLoading, setRepoLoading] = useState(false);

  const [repository, setRepository] = useState<GitHubRepo | null>(null);

  useEffect(() => {
    async function loadRepo() {
      setRepoLoading(true);
      const repo = await getRepoById(Number(id));
      setRepository(repo);
      setRepoLoading(false);
    }

    loadRepo();
  }, [id, getRepoById]);

  useEffect(() => {
    if (!repository || !username) return; // garante que temos dados antes de buscar

    const fetchReadme = async () => {
      setRepoLoading(true);

      try {
        // Busca comentários
        const commentsCount = await fetchRepoCommentCount(repository.name);
        setRepositoryComments(commentsCount);

        // Busca README
        const response = await axios.get('/api/github/readme', {
          params: { owner: username, repo: repository.name }
        });
        setRepositoryReadme(response.data.content);
      } catch (error) {
        console.error('Erro ao buscar detalhes do repositório:', error);
        setRepositoryReadme('');
        setRepositoryComments(0);
      } finally {
        setRepoLoading(false);
      }
    };

    fetchReadme();
  }, [repository, username, fetchRepoCommentCount]);

  return (
    <PostContainer>
      {repository ? (
        <>
          <HeadingContainer className={repoLoading ? 'loading' : ''}>
            <div className="top-heading">
              <button onClick={() => navigate('/')}>
                <CaretLeftIcon size={16} color="#97edaa" weight="bold" />
                voltar
              </button>
              <a
                href={repository?.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                ver no github
                <ArrowSquareOutIcon size={14} color="#97edaa" weight="bold" />
              </a>
            </div>
            <div className="post-info">
              <h2>{repository?.name}</h2>
              <div className="info">
                <span>
                  <GithubLogoIcon size={20} color="#41704e" weight="bold" />{' '}
                  <a
                    href={repository?.owner?.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repository?.owner?.login}
                  </a>
                </span>
                <span>
                  <CalendarBlankIcon size={20} color="#41704E" />
                  {repository?.created_at
                    ? formatProjectDate(new Date(repository.created_at))
                    : ''}
                </span>
                <span>
                  <ChatCircleDotsIcon size={20} color="#41704e" weight="fill" />{' '}
                  {repositoryComments ?? '0'} comentários
                </span>
              </div>
            </div>
          </HeadingContainer>

          <PostContent>
            {repoLoading && (
              <div className="spinner-overlay">
                <GearIcon size={128} color="#97edaa" weight="fill" />
              </div>
            )}
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
                  return src?.includes('.github') ? (
                    <img
                      src={`https://raw.githubusercontent.com/${username}/${repository?.name}/refs/heads/main/${src}`}
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
        <HeadingContainer className={repoLoading ? 'loading' : ''}>
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
      )}
    </PostContainer>
  );
}
