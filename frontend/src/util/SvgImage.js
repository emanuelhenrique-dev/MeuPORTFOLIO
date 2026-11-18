import { jsx as _jsx } from "react/jsx-runtime";
export function SVGImage({ Icon, size = 40, className }) {
    return _jsx(Icon, { width: size, height: size, className: className });
}
