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
import { useGitHubData } from '../../contexts/GitHubContext/GitHubContext';
import { formatProjectDate } from '../../util/formatters';

// imports react
import { useCallback, useEffect, useState } from 'react';

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
  const { username, repos, fetchRepoCommentCount } = useGitHubData();

  const repository = repos.find((repo) => repo.id === Number(id));

  // const token = import.meta.env.VITE_GITHUB_TOKEN;

  const [repositoryComments, setRepositoryComments] = useState<number | null>(
    null
  );
  const [repositoryReadme, setRepositoryReadme] = useState('');
  const [repoLoading, setRepoLoading] = useState(false);

  const [currentRepository, setCurrentRepository] = useState(repository);

  const fetchRepoReadme = useCallback(async () => {
    setRepoLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${username}/${currentRepository?.name}/readme`
        // {
        //   headers: token ? { Authorization: `Bearer ${token}` } : undefined
        // }
      );
      const content = new TextDecoder('utf-8').decode(
        Uint8Array.from(atob(response.data.content), (c) => c.charCodeAt(0))
      );

      setRepositoryReadme(content);
    } catch (error) {
      console.error('Erro ao buscar o README do repositório:', error);
      setRepositoryReadme('');
    } finally {
      setRepoLoading(false);
    }
  }, [currentRepository, username]);

  const getRepository = useCallback(async () => {
    setRepoLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/repositories/${id}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     Accept: 'application/vnd.github+json'
        //   }
        // }
      );

      // console.log('teste:', response.data);

      setCurrentRepository(response.data);
    } catch (error) {
      console.error('Erro ao buscar o repositório:', error);
    } finally {
      setRepoLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!currentRepository) return;

    const repoName = currentRepository.name;

    async function loadComments() {
      const count = await fetchRepoCommentCount(repoName);
      setRepositoryComments(count);
    }

    loadComments();
    fetchRepoReadme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRepository]);

  //se n existe repositório faça isso
  useEffect(() => {
    if (!repository) {
      getRepository();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repository]);

  return (
    <PostContainer>
      {currentRepository ? (
        <>
          <HeadingContainer className={repoLoading ? 'loading' : ''}>
            <div className="top-heading">
              <button onClick={() => navigate('/')}>
                <CaretLeftIcon size={16} color="#97edaa" weight="bold" />
                voltar
              </button>
              <a href={currentRepository.html_url} target="_blank">
                ver no github
                <ArrowSquareOutIcon size={14} color="#97edaa" weight="bold" />
              </a>
            </div>
            <div className="post-info">
              <h2>{currentRepository.name}</h2>
              <div className="info">
                <span>
                  <GithubLogoIcon size={20} color="#41704e" weight="bold" />{' '}
                  <a href={currentRepository.owner.html_url} target="_blank">
                    {currentRepository.owner.login}
                  </a>
                </span>
                <span>
                  <CalendarBlankIcon size={20} color="#41704E" />
                  {formatProjectDate(new Date(currentRepository.created_at))}
                </span>
                <span>
                  <ChatCircleDotsIcon size={20} color="#41704e" weight="fill" />{' '}
                  {repositoryComments ? repositoryComments : '0'} comentários
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
                  const match = src;
                  return match?.includes('.github') ? (
                    <img
                      src={`https://raw.githubusercontent.com/${username}/${currentRepository.name}/refs/heads/main/${match}`}
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
        </>
      )}
    </PostContainer>
  );
}
