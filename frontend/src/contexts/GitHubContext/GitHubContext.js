import { jsx as _jsx } from "react/jsx-runtime";
import axios from 'axios';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
const GitHubContext = createContext({});
export function GitHubProvider({ children }) {
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const reposSizeRef = useRef(null);
    function ChangeCurrentPage(pageNumber) {
        if (pageNumber === currentPage)
            return;
        setCurrentPage(pageNumber);
        fetchRepos(searchQuery, pageNumber); // sempre usa a query atual
    }
    function ChangeSearchQuery(query) {
        setSearchQuery(query);
    }
    const username = 'emanuelhenrique-dev';
    // const token = import.meta.env.VITE_GITHUB_TOKEN;
    const cacheRef = useRef(new Map());
    // --- Busca dos dados profile pelo backend ---
    const fetchProfile = useCallback(async () => {
        try {
            const response = await axios.post('/api/github/graphql', {
                query: `
          {
            user(login: "${username}") {
              name
              login
              avatarUrl
              bio
              url: url
              email
              followers {
                totalCount
              }
            }
          }
        `
            });
            const data = response.data.data.user;
            const user = {
                name: data.name,
                login: data.login,
                avatarUrl: data.avatarUrl,
                bio: data.bio,
                url: data.url,
                email: data.email || undefined,
                followers: data.followers.totalCount
            };
            setProfile(user);
        }
        catch (error) {
            console.error('Erro ao buscar perfil:', error);
        }
    }, [username]);
    // --- Busca de repositórios pelo backend ---
    const fetchRepos = useCallback(async (query, page) => {
        const activeQuery = query !== undefined ? query : searchQuery;
        const current = page ?? currentPage;
        const cacheKey = `${username}-${activeQuery}-${current}`;
        const per_page = 6;
        // ✅ 1. Retorna do cache se já tiver essa página
        if (cacheRef.current.has(cacheKey)) {
            setRepos(cacheRef.current.get(cacheKey));
            return;
        }
        if (query !== undefined)
            setSearchQuery(query); // atualiza query ativa se vier
        setLoading(true);
        try {
            // console.log('page:', page);
            const current = page ?? currentPage; // se page for passada, usa ela
            // console.log('currentPage:', currentPage);
            const searchQuery = activeQuery && activeQuery.trim() !== ''
                ? `${activeQuery} user:${username}`
                : `user:${username}`;
            const response = await axios.get('/api/github/repos', {
                params: {
                    q: searchQuery,
                    sort: 'updated',
                    order: 'desc',
                    per_page,
                    page: current
                },
                validateStatus: (status) => status < 500 // evita que axios jogue exception automática em 403
            });
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
            cacheRef.current.set(cacheKey, reposData);
            reposSizeRef.current = response.data.total_count;
            // ✅ Extrai número total de páginas do header "Link"
            const linkHeader = response.headers.link;
            if (linkHeader) {
                const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
                if (match) {
                    const totalPages = parseInt(match[1]);
                    setTotalPages(totalPages);
                    // console.log('total de paginas:', totalPages);
                }
                else {
                    setTotalPages(Math.ceil(response.data.total_count / per_page));
                    // console.log(
                    //   'total acho:',
                    //   Math.ceil(response.data.total_count / per_page)
                    // );
                }
            }
            else {
                // ❗ Fallback: se não houver link header, só existe 1 página
                setTotalPages(1);
                console.log('sem link header, total de paginas = 1');
            }
        }
        catch (error) {
            console.error('Erro ao buscar repositórios:', error);
            setRepos([]);
        }
        finally {
            setLoading(false);
        }
    }, [username, currentPage, searchQuery]);
    // --- Busca  um repositório pelo nome e usuário---
    async function getRepo(owner, repo) {
        const cached = repos.find((r) => r.owner.login === owner && r.name === repo);
        if (cached)
            return cached;
        const response = await axios.get('/api/github/repo', {
            params: { owner, repo }
        });
        return response.data;
    }
    // --- Busca número de comentários de um repositório ---
    async function fetchRepoCommentCount(repoName) {
        const response = await axios.get(`/api/github/repos`, {
            params: {
                q: `repo:${username}/${repoName} type:issue`,
                per_page: 1
            }
        });
        return response.data.total_count || 0;
    }
    useEffect(() => {
        fetchProfile();
        fetchRepos();
    }, [fetchProfile, fetchRepos]);
    return (_jsx(GitHubContext.Provider, { value: {
            profile,
            repos,
            username,
            currentPage,
            totalPages,
            loading,
            reposSizeRef,
            fetchRepos,
            fetchRepoCommentCount,
            getRepo,
            ChangeCurrentPage,
            ChangeSearchQuery
        }, children: children }));
}
// eslint-disable-next-line react-refresh/only-export-components
export function useGitHubData() {
    const context = useContext(GitHubContext);
    if (!context)
        throw new Error('useContext must be used within GitHubProvider');
    return context;
}
