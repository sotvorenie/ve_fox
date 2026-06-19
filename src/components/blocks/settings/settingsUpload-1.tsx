import {useState} from "react";

import {BASE_URL} from "../../../api/url.ts";

import {ChannelForList, ChannelsListResponse} from "../../../types/channel.ts";
import {Section, SectionResponse} from "../../../types/section.ts";
import {SuccessResponse} from "../../../types/success.ts";

import {apiGetChannels, apiGetChannelSections, apiCheckHasChannelSections} from "../../../api/channel/channel.ts";

import ButtonUi from "../../ui/ButtonUi.tsx";
import Modal from "../../common/Modal.tsx";
import SettingsUploadModal from "./settingsUploadModal.tsx";

import LoadingIcon from "../../../assets/images/icons/LoadingIcon.tsx";

interface Props {
    className: string
}

function SettingsUpload1({className}: Readonly<Props>) {
    const [isVisibleChannels, setIsVisibleChannels] = useState<boolean>(false)
    const [isVisibleSections, setIsVisibleSections] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [channelsArray, setChannelsArray] = useState<ChannelForList[]>([])
    const [activeChannel, setActiveChannel] = useState<ChannelForList>()
    const [channelsTotal, setChannelsTotal] = useState<number>(0)

    const [hasSections, setHasSections] = useState<boolean>(false)
    const [sectionsArray, setSectionsArray] = useState<Section[]>([])
    const [activeSection, setActiveSection] = useState<Section>()
    const [sectionsTotal, setSectionsTotal] = useState<number>(0)

    const getChannels = async () => {
        try {
            if (channelsArray?.length) return

            const response: ChannelsListResponse = await apiGetChannels()

            if (response.channels?.length) {
                setChannelsArray(response.channels)
                setChannelsTotal(response.total)
            }
        } catch (err) {
            console.error(err)
        }
    }
    const changeChannel = async (id: number) => {
        const channel = channelsArray.find((c: ChannelForList) => c.id === id)

        if (channel) {
            setActiveChannel(channel)
            setIsVisibleChannels(false)

            try {
                setIsLoading(true)

                const check: SuccessResponse = await apiCheckHasChannelSections(channel.id)

                setHasSections(check.success ?? false)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
    }

    const getSections = async () => {
        try {
            const response: SectionResponse = await apiGetChannelSections(activeChannel!.id)

            if (response.sections?.length) {
                setSectionsArray(response.sections)
                setSectionsTotal(response.total)
            }
        } catch (err) {
            console.error(err)
        }
    }
    const changeSection = (id: number) => {
        const section = sectionsArray.find((s: Section) => s.id === id)

        if (section) {
            setActiveSection(section)
            setIsVisibleSections(false)
        }
    }

    return (
        <div className={className}>
            <div className="mb-10 text-w500 flex flex-align-center">
                {activeChannel
                    ? (
                        <div className="upload-video__changed-channel flex flex-align-center">
                            <p>Выбран канал:</p>
                            <div className="upload-video__changed-channel_right flex flex-align-center">
                                <div className="upload-video__changed-channel_img-container img-container radius-50">
                                    <img src={`${BASE_URL}/${activeChannel.avatar_url}`} alt={activeChannel.name}/>
                                </div>
                                <p>{activeChannel.name}</p>
                            </div>
                        </div>
                    )
                    : <p>Выберите канал:</p>
                }
            </div>
            <ButtonUi
                func={() => setIsVisibleChannels(true)}
                className="w-100 mb-20"
            >
                {activeChannel ? 'Изменить..' : 'Выбрать'}
            </ButtonUi>
            <Modal visible={isVisibleChannels} setVisible={setIsVisibleChannels}>
                <SettingsUploadModal
                    apiFunc={getChannels}
                    changeFunc={changeChannel}
                    listArr={channelsArray}
                    activeItem={activeChannel}
                    total={channelsTotal}
                />
            </Modal>

            {isLoading && (
                <div className="recolor-svg w-100 h-100 flex-center">
                    <LoadingIcon size={50}/>
                </div>
            )}

            {hasSections && !isLoading && (
                <>
                    <p className="mb-10 text-w500">Выберите раздел:</p>
                    <ButtonUi
                        func={() => setIsVisibleSections(true)}
                        className="w-100"
                    >
                        {activeSection ? 'Изменить..' : 'Выбрать..'}
                    </ButtonUi>
                    <Modal visible={isVisibleSections} setVisible={setIsVisibleSections}>
                        <SettingsUploadModal
                            apiFunc={getSections}
                            changeFunc={changeSection}
                            listArr={sectionsArray}
                            activeItem={activeSection}
                            total={sectionsTotal}
                        />
                    </Modal>
                </>
            )}
        </div>
    )
}

export default SettingsUpload1;