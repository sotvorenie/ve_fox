import {useChannel} from "../../../../hooks/useChannel.ts";

function ChannelAbout() {
    const {channelName} = useChannel();

    return (
        <>
            <p className="channel__sub-title h6">Информация о канале {channelName}</p>
            <span>привет</span>
        </>
    )
}

export default ChannelAbout;