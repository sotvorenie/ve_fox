import {Dispatch, SetStateAction, useEffect, useState} from "react";

import {Channel} from "../../../types/channel.ts";

import {apiGetChannels} from "../../../api/upload/getChannels.ts";

import Modal from "../../common/Modal.tsx";
import ChannelsSkeleton from "../../ui/skeletons/ChannelsSkeleton.tsx";

interface Props {
    channelsModalVisible: boolean;
    setChannelsModalVisible: Dispatch<SetStateAction<boolean>>;

    setIsError: Dispatch<SetStateAction<boolean>>;

    channel: Channel;
    setChannel: Dispatch<SetStateAction<Channel>>;
}

function HeaderChannelsList({
                                channelsModalVisible,
                                setChannelsModalVisible,
                                setIsError,
                                channel,
                                setChannel
}: Props) {

    const [channels, setChannels] = useState<Channel[]>([]);
    const [filteredChannels, setFilteredChannels] = useState<Channel[]>([]);

    const [total, setTotal] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    const getChannels = async () => {
        try {
            setIsLoading(true)

            const data = await apiGetChannels()

            setChannels(data.channels)
            setFilteredChannels(data.channels)
            setTotal(data.total)
        } catch (err) {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChannel = (el: Channel) => {
        setChannel(el)
        setChannelsModalVisible(false)
    }

    const handleSearch = (name: string) => {
        if (!name) {
            setFilteredChannels(channels)
        } else {
            setFilteredChannels(channels?.filter((channel) => channel.name.toLowerCase().includes(name.toLowerCase())))
        }
    }

    useEffect(() => {
        getChannels()
    }, []);

    return (
        <>
            <Modal visible={channelsModalVisible} setVisible={setChannelsModalVisible}>
                {channelsModalVisible && (
                    <Modal.Content close={() => setChannelsModalVisible(false)} isSmall={true}>
                        {isLoading && <ChannelsSkeleton/>}

                        {!isLoading && (
                            <>
                                <form className="upload__form">
                                    <input type="text"
                                           className="upload__input input"
                                           placeholder="Введите название канала"
                                           onChange={(e) => handleSearch(e.target.value)}
                                    />
                                </form>

                                <p className="upload__total">Каналов: {total}</p>

                                <ul className="upload__list">
                                    {filteredChannels && filteredChannels?.map((item: Channel) => (
                                        <li className="upload__item overflow-hidden"
                                            key={item.name}
                                            onClick={() => handleChannel(item)}
                                        >
                                            <button className={`flex flex-align-center ${channel?.name === item?.name ? 'is-active' : ''}`}
                                                    type="button"
                                            >
                                                <img src={item?.avatar} alt={item?.name}/>
                                                {item?.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </Modal.Content>
                )}
            </Modal>
        </>
    )
}

export default HeaderChannelsList;