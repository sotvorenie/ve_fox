import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {Video} from "../types/video.ts";
import {ResponseVideos} from "../types/responseVideos.ts";
import {Channel} from "../types/channel.ts";

import {apiGetChannel, apiGetVideosFromChannel} from "../api/channel/channel.ts";

import ChannelMain from "../components/blocks/channel/ChannelMain.tsx";
import ChannelVideos from "../components/blocks/channel/ChannelVideos.tsx";
import ChannelAbout from "../components/blocks/channel/ChannelAbout.tsx";
import ChannelTabs from "../components/blocks/channel/ChannelTabs.tsx";

function ChannelPage() {
    const [searchParams] = useSearchParams()

    const [activeTab, setActiveTab] = useState(0)

    const [name, setName] = useState<string>("")
    const [avatar, setAvatar] = useState<string | null>(null)
    const [date, setDate] = useState<string>('')

    const [videos, setVideos] = useState<Video[]>([])
    const [newVideos, setNewVideos] = useState<Video[]>([])

    const [page, setPage] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    const [hasMore, setHasMore] = useState<boolean>(false)

    const getChannelVideos = async () => {
        try {
            const data: ResponseVideos = await apiGetVideosFromChannel(name, page, hasMore)

            if (data) {
                setVideos(data.videos)

                if (page === 1) {
                    setNewVideos(data.videos?.slice(0, 3))
                }

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
                setDate(data.date)
            }
        } catch (err) {

        }
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

            <ChannelTabs activeTab={activeTab} setActiveTab={setActiveTab}/>

            {activeTab === 0 && (<ChannelMain videos={newVideos}/>)}
            {activeTab === 1 && (<ChannelVideos videos={videos} hasMore={hasMore}/>)}
            {activeTab === 2 && (<ChannelAbout total={total} date={date}/>)}
        </div>
    )
}

export default ChannelPage;