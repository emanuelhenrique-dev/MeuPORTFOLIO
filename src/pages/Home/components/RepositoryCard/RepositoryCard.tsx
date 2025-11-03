import { RepositoryCardContainer } from './RepositotyCard.styles';

interface RepositoryCardProps {
  name: string;
  description: string | null;
  created_at: string;
}

export function RepositoryCard({
  name,
  description,
  created_at
}: RepositoryCardProps) {
  return (
    <RepositoryCardContainer>
      <div className="heading">
        <h3>{name}</h3>
        <span> {created_at} </span>
      </div>
      <p>{description}</p>
    </RepositoryCardContainer>
  );
}
