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

  return (
    <SearchFormContainer>
      <span>{reposSizeRef.current} publicações</span>
      <input type="text" placeholder="Buscar conteúdo" {...register('query')} />
    </SearchFormContainer>
  );
}
