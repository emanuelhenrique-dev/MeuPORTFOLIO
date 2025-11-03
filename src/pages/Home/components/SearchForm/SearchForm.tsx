import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { SearchFormContainer } from './SearchForm.styles';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useGitHubData } from '../../../../contexts/GitHubContext/GitHubContext';

const searchFormSchema = z.object({
  query: z.string().optional()
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const { register, watch } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  });

  const query = watch('query');

  const { fetchRepos, repos } = useGitHubData();

  useEffect(() => {
    if (query === undefined) return;

    const timeout = setTimeout(() => {
      fetchRepos(query);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, fetchRepos]);

  return (
    <SearchFormContainer>
      <span>{repos.length} publicações</span>
      <input type="text" placeholder="Buscar conteúdo" {...register('query')} />
    </SearchFormContainer>
  );
}
