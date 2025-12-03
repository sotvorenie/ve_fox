import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {Video} from "../types/video.ts";
import {ResponseVideos} from "../types/responseVideos.ts";
import {Channel} from "../types/channel.ts";

import {apiGetChannel, apiGetVideosFromChannel} from "../api/channel/channel.ts";

import ChannelMain from "../components/blocks/channel/channelMain.tsx";
import ChannelVideos from "../components/blocks/channel/channelVideos.tsx";
import ChannelAbout from "../components/blocks/channel/channelAbout.tsx";

function ChannelPage() {
    const [searchParams] = useSearchParams()

    const [activeTab, setActiveTab] = useState(0)

    const [name, setName] = useState<string>("")
    const [avatar, setAvatar] = useState<string | null>(null)
    const [videos, setVideos] = useState<Video[]>([])

    const [page, setPage] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    const [_, setHasMore] = useState<boolean>(false)

    const getChannelVideos = async () => {
        try {
            const data: ResponseVideos = await apiGetVideosFromChannel(name, page)

            if (data) {
                setVideos(data.videos)

                setPage(page + 1)
                setHasMore(data.has_more)
                setTotal(data.total)
            }
        } catch (err) {

        }
    }

    const getChannel = async () => {
        try {
            const data: Channel = await apiGetChannel(name)

            if (data) {
                setName(data.name)
                setAvatar(data.avatar)
            }
        } catch (err) {

        }
    }

    const handleTab = (index: number) => {
        setActiveTab(index)
    }

    useEffect(() => {
        setName(searchParams.get('name') ?? '')
    }, []);

    useEffect(() => {
        if (name) {
            getChannel()
            getChannelVideos()
        }
    }, [name]);

    return (
        <div className="main-page__channel channel m-auto">
            <div className="channel__banner"></div>

            <div className="channel__info flex flex-align-center">
                <div className="channel__avatar img-container flex-center">
                    {avatar ?
                        <img src={avatar} alt={name}/>
                        : <span className="text-center">{name?.[0]}</span>
                    }
                </div>
                <p className="h3">{name}</p>
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

            {activeTab === 0 && (<ChannelMain videos={videos}/>)}
            {activeTab === 1 && (<ChannelVideos videos={videos}/>)}
            {activeTab === 2 && (<ChannelAbout total={total}/>)}
        </div>
    )
}

export default ChannelPage;