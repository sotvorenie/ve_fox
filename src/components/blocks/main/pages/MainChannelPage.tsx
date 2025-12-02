import {useSearchParams} from "react-router-dom";

import {useChannel} from "../../../../hooks/useChannel.ts";
import {useEffect, useState} from "react";
import ChannelMain from "../channel/channelMain.tsx";
import ChannelVideos from "../channel/channelVideos.tsx";
import ChannelAbout from "../channel/channelAbout.tsx";

function MainChannelPage() {
    const {channelName, channelAvatar, getChannelVideos, setChannelName, setChannelAvatar} = useChannel();

    const [searchParams, setSearchParams] = useSearchParams()

    const [activeTab, setActiveTab] = useState(0)

    const handleTab = (index: number) => {
        setActiveTab(index)
    }

    useEffect(() => {
        if (!channelName) {
            setChannelName(searchParams.get('channelName') ?? '')
            setChannelAvatar(searchParams.get('channelAvatar'))
        }
    }, []);

    useEffect(() => {
        if (channelName) {
            setSearchParams({
                page: 'channel',
                channelName: channelName,
                channelAvatar: channelAvatar ?? ''
            })

            getChannelVideos()
        }
    }, [channelName]);

    return (
        <div className="main-page__channel channel m-auto">
            <div className="channel__banner"></div>

            <div className="channel__info flex flex-align-center">
                <div className="channel__avatar img-container flex-center">
                    {channelAvatar ?
                        <img src={channelAvatar} alt={channelName}/>
                        : <span className="text-center">{channelName[0]}</span>
                    }
                </div>
                <p className="h3">{channelName}</p>
            </div>

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

            {activeTab === 0 && (<ChannelMain/>)}
            {activeTab === 1 && (<ChannelVideos/>)}
            {activeTab === 2 && (<ChannelAbout/>)}
        </div>
    )
}

export default MainChannelPage;