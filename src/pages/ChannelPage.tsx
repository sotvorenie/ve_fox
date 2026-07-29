import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";

import {BASE_URL} from "@api/url";

import {VideoForList} from "@/types/video";
import {Channel, ChannelResponse} from "@/types/channel";

import {apiGetChannel} from "@api/channel/channel";

import ChannelMain from "@channel/ChannelMain";
import ChannelVideos from "@channel/ChannelVideos";
import ChannelAbout from "@channel/ChannelAbout";
import ChannelTabs from "@channel/ChannelTabs";
import ChannelBanner from "@channel/ChannelBanner.tsx";

function ChannelPage() {
    const { setHeaderOptions } = useOutletContext<{ setHeaderOptions: any }>();
    const { id } = useParams<{ id: string }>();

    const [activeTab, setActiveTab] = useState(0)

    const [channel, setChannel] = useState<Channel | null>(null)

    const [videos, setVideos] = useState<VideoForList[]>([])
    const [newVideos, setNewVideos] = useState<VideoForList[]>([])
    const [popularVideos, setPopularVideos] = useState<VideoForList[]>([])

    const [page, setPage] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    const [hasMore, setHasMore] = useState<boolean>(false)

    const getChannel = async () => {
        try {
            const response: ChannelResponse = await apiGetChannel(+id!)

            if (response) {
                setChannel(response.channel)
                setVideos(response.newVideos.videos)

                setNewVideos(response.newVideos.videos.slice(0, 8))
                setPage(page + 1)
                setHasMore(response.newVideos.hasMore)
                setTotal(response.newVideos.total)

                setPopularVideos(response.popularVideos)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        setHeaderOptions({ visibleNavigation: true, isOnlyBack: true })
        getChannel().then()
    }, [])

    return (
        <div className="main-page__channel channel m-auto">
            <ChannelBanner videos={videos}/>

            <div className="channel__info flex flex-align-center">
                <div className="channel__avatar img-container flex-center">
                    {channel?.avatarUrl ?
                        <img src={`${BASE_URL}${channel.avatarUrl}`} alt={channel.name}/>
                        : <span className="text-center">{channel?.name?.[0]}</span>
                    }
                </div>
                <p className="h5">{channel?.name}</p>
            </div>

            <ChannelTabs activeTab={activeTab} setActiveTab={setActiveTab}/>

            <div style={{display: activeTab === 0 ? 'block' : 'none'}}>
                <ChannelMain newVideos={newVideos} popularVideos={popularVideos}/>
            </div>

            <div style={{display: activeTab === 1 ? 'block' : 'none'}}>
                <ChannelVideos videos={videos} hasMore={hasMore}/>
            </div>

            <div style={{display: activeTab === 2 ? 'block' : 'none'}}>
                <ChannelAbout total={total} date={channel?.date}/>
            </div>
        </div>
    )
}

export default ChannelPage;