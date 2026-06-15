import React from "react";

interface Props {
    children: React.ReactNode;
    className: string;
}

function SettingsBlock({children, className}: Readonly<Props>) {
    return (
        <div className={`settings__block absolute-center tr-opacity ${className}`}>
            {children}
        </div>
    )
}

export default SettingsBlock;