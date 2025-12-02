import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../store";
import {setChannelName, setChannelAvatar, setChannelVideos} from "../store/useChannelStore.ts";
import {apiGetVideosFromChannel} from "../api/channel/channel.ts";

export const useChannel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        channelName,
        channelAvatar,
        channelVideos,
        page,
    } = useSelector((state: RootState) => state.channel);

    const getChannelVideos = async () => {
        try {
            const response  = await apiGetVideosFromChannel(channelName, page)
            dispatch(setChannelVideos(response.videos));
        } catch (err) {
            console.log(err)
        }
    }

    return {
        channelName,
        channelAvatar,
        channelVideos,
        page,

        setChannelName: (name: string) => dispatch(setChannelName(name)),
        setChannelAvatar: (url: string | null) => dispatch(setChannelAvatar(url)),
        getChannelVideos,
    }
}