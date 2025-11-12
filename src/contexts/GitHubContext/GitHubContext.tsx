import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

export interface GitHubProfile {
  name: string;
  login: string;
  avatarUrl: string;
  bio: string;
  url: string;
  email?: string;
  followers: { totalCount: number };
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  created_at: string;
  stargazers_count: number;
  owner: {
    login: string;
    html_url: string;
  };
}

interface GitHubContextType {
  username: string;
  profile: GitHubProfile | null;
  repos: GitHubRepo[];
  currentPage: number;
  totalPages: number | null;
  fetchRepos: (query?: string) => Promise<void>;
  fetchRepoCommentCount: (repoName: string) => Promise<number>;
  ChangeCurrentPage: (pageNumber: number) => void;
}

interface GitHubContextProviderProps {
  children: React.ReactNode;
}

const GitHubContext = createContext({} as GitHubContextType);

export function GitHubProvider({ children }: GitHubContextProviderProps) {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  function ChangeCurrentPage(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  const username = 'emanuelhenrique-dev';
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  // --- GraphQL para buscar perfil ---
  const queryProfile = `
      {
        user(login: "${username}") {
          name
          avatarUrl
          bio
          url
          email
          login
          followers {
            totalCount
          }
        }
      }
    `;

  // --- Busca dos dados profile (REST API) ---
  const fetchProfile = useCallback(async () => {
    try {
      const response = await axios.post(
        'https://api.github.com/graphql',
        { query: queryProfile },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const user = response.data.data.user;
      setProfile(user);
      console.log(user);
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
    }
  }, [queryProfile, token]);

  // --- Busca de repositórios (REST API) ---
  const fetchRepos = useCallback(
    async (query?: string) => {
      try {
        const searchQuery =
          query && query.trim() !== ''
            ? `${query} user:${username}`
            : `user:${username}`;

        const response = await axios.get(
          'https://api.github.com/search/repositories',
          {
            params: {
              q: searchQuery,
              sort: 'updated',
              order: 'desc',
              per_page: 6,
              page: currentPage
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log(response);

        setRepos(response.data.items || []);
        console.log(response.data.items);

        // ✅ Extrai número total de páginas do header "Link"
        const linkHeader = response.headers.link;
        if (linkHeader) {
          const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
          if (match) {
            const totalPages = parseInt(match[1]);
            setTotalPages(totalPages);
            console.log('total de paginas:', totalPages);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
        setRepos([]);
      }
    },
    [username, token, currentPage]
  );

  // ver a quantidade de comments de um repositório
  async function fetchRepoCommentCount(repoName: string) {
    const response = await axios.get(
      `https://api.github.com/repos/${username}/${repoName}/issues`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      }
    );

    return response.data.length;
  }

  useEffect(() => {
    fetchProfile();
    fetchRepos();
  }, [fetchProfile, fetchRepos]);

  return (
    <GitHubContext.Provider
      value={{
        profile,
        repos,
        username,
        currentPage,
        totalPages,
        fetchRepos,
        fetchRepoCommentCount,
        ChangeCurrentPage
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGitHubData() {
  const context = useContext(GitHubContext);
  if (!context)
    throw new Error('useContext must be used within GitHubProvider');
  return context;
}
