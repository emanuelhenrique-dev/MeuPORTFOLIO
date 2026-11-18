import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CardInfo, MainCardContainer, Tag } from './MainCard.styles';
export function MainCard({ name, description, image, technologies, github, website, post_url }) {
    return (_jsxs(MainCardContainer, { children: [_jsxs(CardInfo, { to: post_url, title: description, children: [_jsx("div", { className: "img-wrapper", children: _jsx("img", { src: image, alt: "" }) }), _jsx("h3", { children: name }), _jsx("div", { className: "tags", children: technologies.map((technology, index) => {
                            return (_jsx(Tag, { "$tag": technology, children: technology }, index));
                        }) })] }), _jsxs("div", { className: "buttons", children: [_jsx("a", { href: website, target: "_blank", children: "Acessar Projeto" }), _jsx("a", { href: github, target: "_blank", children: "Reposit\u00F3rio" })] })] }));
}
