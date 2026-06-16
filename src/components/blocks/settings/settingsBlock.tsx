import React from "react";

import CrossIcon from "../../../assets/images/icons/CrossIcon.tsx";

interface Props {
    children: React.ReactNode;
    className: string;
    setIsVisible: (value:boolean) => void;
}

const Title = ({ children }: { children: React.ReactNode }) => (
    <p className="settings__title h5">{children}</p>
)

const Content = ({ children, className }: { children: React.ReactNode, className: string }) => (
    <div className={`settings__content ${className}`}>{children}</div>
)

function SettingsBlock({children, className, setIsVisible}: Readonly<Props>) {
    return (
        <div className={`settings__block absolute-center tr-opacity ${className}`}
             onClick={(e) => e.stopPropagation()}
        >
            <button className="settings__close recolor-svg hover-color-accent position-absolute radius-50 flex-center"
                    type="button"
                    onClick={() => setIsVisible(false)}
            >
                <CrossIcon/>
            </button>

            {children}
        </div>
    )
}

SettingsBlock.Title = Title
SettingsBlock.Content = Content

export default SettingsBlock;