import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { SearchFormContainer } from './SearchForm.styles';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useGitHubData } from '../../../../contexts/GitHubContext/GitHubContext';
const searchFormSchema = z.object({
    query: z.string().optional()
});
export function SearchForm() {
    const { register, watch } = useForm({
        resolver: zodResolver(searchFormSchema),
        defaultValues: { query: '' }
    });
    const query = watch('query');
    const { fetchRepos, ChangeCurrentPage, reposSizeRef } = useGitHubData();
    useEffect(() => {
        const timeout = setTimeout(() => {
            // Quando apagar tudo → busca a lista completa
            if (query === undefined) {
                return;
            }
            // Quando tem texto → busca filtrada
            ChangeCurrentPage(1);
            fetchRepos(query, 1);
        }, 500);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);
    return (_jsxs(SearchFormContainer, { children: [_jsxs("span", { children: [reposSizeRef.current, " publica\u00E7\u00F5es"] }), _jsx("input", { type: "text", placeholder: "Buscar conte\u00FAdo", ...register('query') })] }));
}
