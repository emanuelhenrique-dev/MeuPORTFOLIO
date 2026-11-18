import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HeaderContainer, HeaderContent } from './Header.styles';
import logoImg from '/Logo-img.png';
export function Header() {
    return (_jsxs(HeaderContainer, { children: [_jsx("a", { className: "linkOut", href: "https://portfolio-alpha-ten-50.vercel.app/", target: "_blank", rel: "noopener noreferrer", children: "Portfolio antigo" }), _jsxs(HeaderContent, { children: [_jsx("span", { className: "left-effect" }), _jsx("img", { src: logoImg, alt: "" }), _jsx("h1", { className: "logo", children: "MEU PORTF\u00D3LIO" }), _jsx("span", { className: "right-effect" })] })] }));
}
