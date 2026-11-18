import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RepositoryCardContainer } from './RepositotyCard.styles';
import { formatProjectDate } from '../../../../util/formatters';
export function RepositoryCard({ id, name, description, created_at }) {
    const repositoryCard = {
        id: id,
        name: name,
        description: description
            ? description
            : 'Este repositório não possui descrição',
        created_at: created_at
    };
    return (_jsxs(RepositoryCardContainer, { to: `/post/emanuelhenrique-dev/${repositoryCard.name}`, children: [_jsxs("div", { className: "heading", children: [_jsx("h3", { children: repositoryCard.name.replace(/^-/, '') }), _jsx("span", { children: formatProjectDate(new Date(created_at)) })] }), _jsx("p", { children: repositoryCard.description })] }));
}
