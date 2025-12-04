
interface Props {
    activeTab: number;
    setActiveTab: (activeTab: number) => void;
}

function ChannelTabs({activeTab, setActiveTab}: Props) {
    const handleTab = (index: number) => {
        setActiveTab(index)
    }

    return (
        <ul className="channel__tabs flex flex-align-center">
            <li className={
                activeTab === 0 ? 'channel__tab is-active hover-color-accent'
                    : 'channel__tab hover-color-accent'
            }
                onClick={() => handleTab(0)}
            >
                <button type="button">Главная</button>
            </li>
            <li className={
                activeTab === 1 ? 'channel__tab is-active hover-color-accent'
                    : 'channel__tab hover-color-accent'
            }
                onClick={() => handleTab(1)}
            >
                <button type="button">Видео</button>
            </li>
            <li className={
                activeTab === 2 ? 'channel__tab is-active hover-color-accent'
                    : 'channel__tab hover-color-accent'
            }
                onClick={() => handleTab(2)}
            >
                <button type="button">О канале</button>
            </li>
        </ul>
    )
}

export default ChannelTabs;