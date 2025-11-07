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
  fetchRepos: (query?: string) => Promise<void>;
  fetchRepoCommentCount: (repoName: string) => Promise<number>;
}

interface GitHubContextProviderProps {
  children: React.ReactNode;
}

const GitHubContext = createContext({} as GitHubContextType);

export function GitHubProvider({ children }: GitHubContextProviderProps) {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

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
            params: { q: searchQuery, sort: 'updated', order: 'desc' },
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setRepos(response.data.items || []);
        console.log(response.data.items);
      } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
        setRepos([]);
      }
    },
    [username, token]
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
      value={{ profile, repos, fetchRepos, fetchRepoCommentCount, username }}
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
