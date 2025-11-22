import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { useGitHubData } from '../../../../contexts/GitHubContext/GitHubContext';
import { PaginationContainer } from './Pagination.styles';

export function Pagination() {
  const { currentPage, totalPages, ChangeCurrentPage, loading } =
    useGitHubData();

  if (!totalPages || totalPages <= 1) return null;

  const safeTotalPages = totalPages;

  const handlePrev = () => {
    ChangeCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNext = () => {
    ChangeCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  const handlePageClick = (pageNumber: number) => {
    ChangeCurrentPage(pageNumber);
  };

  function renderPages() {
    const pagesToShow = 4;

    const start = Math.max(
      1,
      Math.min(
        currentPage - Math.floor(pagesToShow / 2),
        safeTotalPages - pagesToShow + 1
      )
    );
    const end = Math.min(safeTotalPages, start + pagesToShow - 1);

    const pages = [];

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          className={i === currentPage ? 'active' : ''}
          onClick={() => handlePageClick(i)}
          aria-current={i === currentPage ? 'page' : undefined}
        >
          {i}
        </button>
      );
    }
    return pages;
  }

  return (
    <PaginationContainer className={loading ? 'loading' : ''}>
      <button
        className="prev"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon size={16} />
        Anterior
      </button>
      <div className="pagination-buttons">{renderPages()}</div>
      <button
        className="next"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Próximo
        <ArrowRightIcon size={16} />
      </button>
    </PaginationContainer>
  );
}
