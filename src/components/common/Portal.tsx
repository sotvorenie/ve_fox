import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
    children: ReactNode;
    selector?: string;
}

function Portal({ children, selector }: PortalProps) {
    const [container, setContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!selector) {
            setContainer(document.body);
            return;
        }

        let element = document.querySelector(selector) as HTMLElement;

        if (!element) {
            element = document.createElement("div");
            element.className = selector.replace(".", "");
            document.body.appendChild(element);
        }

        setContainer(element);
    }, [selector]);

    if (!container) return null;

    return ReactDOM.createPortal(children, container);
}

export default Portal;