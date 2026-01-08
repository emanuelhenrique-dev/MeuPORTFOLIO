import { RepositoryCardContainer } from './RepositotyCard.styles';
import { formatProjectDate } from '../../../../util/formatters';

interface RepositoryCardProps {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
}

export function RepositoryCard({
  id,
  name,
  description,
  created_at
}: RepositoryCardProps) {
  const repositoryCard: RepositoryCardProps = {
    id: id,
    name: name,
    description: description
      ? description
      : 'Este repositório não possui descrição',
    created_at: created_at
  };

  return (
    <RepositoryCardContainer
      to={`/post/emanuelhenrique-dev/${repositoryCard.name}`}
    >
      <div className="heading">
        <h3>{repositoryCard.name.replace(/^-/, '')}</h3>
        <span>{formatProjectDate(new Date(created_at))}</span>
      </div>
      <p>{repositoryCard.description}</p>
    </RepositoryCardContainer>
  );
}
