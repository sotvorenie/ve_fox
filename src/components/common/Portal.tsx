import ReactDOM from "react-dom";
import { ReactNode } from "react";

interface PortalProps {
    children: ReactNode;
}

function Portal({ children }: PortalProps) {
    return ReactDOM.createPortal(children, document.body);
}

export default Portal;