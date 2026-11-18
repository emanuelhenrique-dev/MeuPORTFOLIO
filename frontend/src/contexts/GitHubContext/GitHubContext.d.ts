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
    homepage: string;
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
    getRepo: (owner: string, repo: string) => Promise<GitHubRepo>;
    ChangeCurrentPage: (pageNumber: number) => void;
    ChangeSearchQuery: (query: string) => void;
}
interface GitHubContextProviderProps {
    children: React.ReactNode;
}
export declare function GitHubProvider({ children }: GitHubContextProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useGitHubData(): GitHubContextType;
export {};
