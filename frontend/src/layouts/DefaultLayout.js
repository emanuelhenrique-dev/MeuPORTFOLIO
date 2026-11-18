import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//rrd imports
import { Outlet } from 'react-router-dom';
//Components imports
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { AppContainer } from './DefaultLayout.styles';
export function DefaultLayout() {
    return (_jsxs(AppContainer, { children: [_jsx(Header, {}), _jsx(Outlet, {}), _jsx(Footer, {})] }));
}
