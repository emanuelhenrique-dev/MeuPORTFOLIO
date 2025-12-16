import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';

export interface GitHubProfile {
  name: string;
  login: string;
  avatarUrl: string;
  bio: string;
  url: string;
  email?: string;
  followers: number;
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
  loading: boolean;
  reposSizeRef: React.RefObject<number | null>;
  fetchRepos: (query?: string, page?: number) => Promise<void>;
  fetchRepoCommentCount: (repoName: string) => Promise<number>;
  ChangeCurrentPage: (pageNumber: number) => void;
  ChangeSearchQuery: (query: string) => void;
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const reposSizeRef = useRef<number | null>(null);

  function ChangeCurrentPage(pageNumber: number) {
    if (pageNumber === currentPage) return;
    setCurrentPage(pageNumber);
    fetchRepos(searchQuery, pageNumber); // sempre usa a query atual
  }

  function ChangeSearchQuery(query: string) {
    setSearchQuery(query);
  }

  const username = 'emanuelhenrique-dev';
  // const token = import.meta.env.VITE_GITHUB_TOKEN;
  const cache = new Map();

  // --- Busca dos dados profile (REST API) ---
  const fetchProfile = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );

      console.log(response.data.email);

      const user = {
        name: response.data.name,
        avatarUrl: response.data.avatar_url,
        bio: response.data.bio, // SE vier null, é porque GitHub não mostra sem token
        url: response.data.html_url,
        email: response.data.email, // normalmente vem null sem token
        login: response.data.login,
        followers: response.data.followers
      };

      setProfile(user);
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
    }
  }, [username]);

  // --- Busca de repositórios (REST API) ---
  const fetchRepos = useCallback(
    async (query?: string, page?: number) => {
      const cacheKey = `${username}-${query}-${currentPage}`;
      const per_page = 6;

      // ✅ 1. Retorna do cache se já tiver essa página
      if (cache.has(cacheKey)) {
        setRepos(cache.get(cacheKey));
        return;
      }

      const activeQuery = query !== undefined ? query : searchQuery;
      if (query !== undefined) setSearchQuery(query); // atualiza query ativa se vier

      setLoading(true);

      try {
        // console.log('page:', page);
        const current = page ?? currentPage; // se page for passada, usa ela
        // console.log('currentPage:', currentPage);
        const searchQuery =
          activeQuery && activeQuery.trim() !== ''
            ? `${activeQuery} user:${username}`
            : `user:${username}`;

        const response = await axios.get(
          'https://api.github.com/search/repositories',
          {
            params: {
              q: searchQuery,
              sort: 'updated',
              order: 'desc',
              per_page,
              page: current
            },
            // headers: {
            //   Authorization: `Bearer ${token}`
            // }
            validateStatus: (status) => status < 500 // evita que axios jogue exception automática em 403
          }
        );

        // ✅ 2. Tratamento de rate limit (403)
        if (response.status === 403) {
          const reset = response.headers['x-ratelimit-reset'];
          const resetDate = reset ? new Date(Number(reset) * 1000) : null;
          const message = resetDate
            ? `Limite da API atingido. Tente novamente às ${resetDate.toLocaleTimeString()}.`
            : 'Limite de requisições da API atingido. Tente novamente mais tarde.';
          console.warn(message);
          alert(message);
          return;
        }

        if (response.status !== 200) {
          console.error('Erro na resposta da API:', response.status);
          setRepos([]);
          return;
        }

        const reposData = response.data.items || [];
        setRepos(reposData);
        //salva no cache
        cache.set(cacheKey, reposData);

        reposSizeRef.current = response.data.total_count;

        // ✅ Extrai número total de páginas do header "Link"
        const linkHeader = response.headers.link;
        if (linkHeader) {
          const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
          if (match) {
            const totalPages = parseInt(match[1]);
            setTotalPages(totalPages);
            // console.log('total de paginas:', totalPages);
          } else {
            setTotalPages(Math.ceil(response.data.total_count / per_page));
            // console.log(
            //   'total acho:',
            //   Math.ceil(response.data.total_count / per_page)
            // );
          }
        } else {
          // ❗ Fallback: se não houver link header, só existe 1 página
          setTotalPages(1);
          console.log('sem link header, total de paginas = 1');
        }
      } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [username, currentPage, searchQuery]
  );

  // ver a quantidade de comments de um repositório
  async function fetchRepoCommentCount(repoName: string) {
    const response = await axios.get(
      `https://api.github.com/repos/${username}/${repoName}/issues`
      // {
      //   headers: token ? { Authorization: `Bearer ${token}` } : undefined
      // }
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
        loading,
        reposSizeRef,
        fetchRepos,
        fetchRepoCommentCount,
        ChangeCurrentPage,
        ChangeSearchQuery
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
