import SettingsBlock from "./settingsBlock.tsx";

interface Props {
    isVisible: boolean
}

function SettingsRedactUser({isVisible}: Readonly<Props>) {

    return (
        <SettingsBlock className={isVisible ? 'is-active' : ''}>
            привет
        </SettingsBlock>
    )
}

export default SettingsRedactUser;