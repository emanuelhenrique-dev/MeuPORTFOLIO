import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { useGitHubData } from '../../../../contexts/GitHubContext/GitHubContext';
import { PaginationContainer } from './Pagination.styles';
export function Pagination() {
    const { currentPage, totalPages, ChangeCurrentPage, loading } = useGitHubData();
    if (!totalPages || totalPages <= 1)
        return null;
    const safeTotalPages = totalPages;
    const handlePrev = () => {
        ChangeCurrentPage(Math.max(currentPage - 1, 1));
    };
    const handleNext = () => {
        ChangeCurrentPage(Math.min(currentPage + 1, totalPages));
    };
    const handlePageClick = (pageNumber) => {
        ChangeCurrentPage(pageNumber);
    };
    function renderPages() {
        const pagesToShow = 4;
        const start = Math.max(1, Math.min(currentPage - Math.floor(pagesToShow / 2), safeTotalPages - pagesToShow + 1));
        const end = Math.min(safeTotalPages, start + pagesToShow - 1);
        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(_jsx("button", { className: i === currentPage ? 'active' : '', onClick: () => handlePageClick(i), "aria-current": i === currentPage ? 'page' : undefined, children: i }, i));
        }
        return pages;
    }
    return (_jsxs(PaginationContainer, { className: loading ? 'loading' : '', children: [_jsxs("button", { className: "prev", onClick: handlePrev, disabled: currentPage === 1, children: [_jsx(ArrowLeftIcon, { size: 16 }), "Anterior"] }), _jsx("div", { className: "pagination-buttons", children: renderPages() }), _jsxs("button", { className: "next", onClick: handleNext, disabled: currentPage === totalPages, children: ["Pr\u00F3ximo", _jsx(ArrowRightIcon, { size: 16 })] })] }));
}
