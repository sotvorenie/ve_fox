import { Dispatch, ReactNode, SetStateAction } from "react";
import { createPortal } from "react-dom";
import CrossIcon from "../../assets/images/icons/CrossIcon.tsx";

interface ModalProps {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
}

function Modal({ children }: ModalProps) {
    return <>{children}</>;
}

Modal.Trigger = ({ children, open }: { children: ReactNode; open: () => void }) => {
    return <div onClick={open}>{children}</div>;
};

Modal.Content = ({children, close, isSmall = false, closeActive = true}: {
    children: ReactNode;
    close: () => void;
    isSmall?: boolean;
    closeActive?: boolean;
}) => {
    return createPortal(
        <div className="modal position-absolute" onClick={closeActive ? close : () => {}}>
            <div className={`modal__content ${isSmall && 'is-small'}`}
                 onClick={(e) => e.stopPropagation()}
            >
                {closeActive && (
                    <button
                        className="modal__close recolor-svg position-absolute flex-center hover-color-accent"
                        onClick={closeActive ? close : () => {
                        }}
                    >
                        <CrossIcon/>
                    </button>
                )}
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;