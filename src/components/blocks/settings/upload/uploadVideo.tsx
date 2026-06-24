import {useState} from "react";

import {Video} from "@/types/video.ts";
import {ChannelForList} from "@/types/channel.ts";
import {Section} from "@/types/section.ts";

import {apiUploadVideo} from "@/api/upload/upload.ts";

import SettingsBlock from "@/components/blocks/settings/settingsBlock.tsx";
import Upload1 from "@/components/blocks/settings/upload/upload-1.tsx";
import Upload2 from "@/components/blocks/settings/upload/upload-2.tsx";
import Upload3 from "@/components/blocks/settings/upload/upload-3.tsx";
import ButtonUi from "@/components/ui/ButtonUi.tsx";

import LoadingIcon from "@/assets/images/icons/LoadingIcon.tsx";

interface Props {
    isVisible: boolean
    setIsVisible: (value:boolean) => void
}

function UploadVideo({isVisible, setIsVisible}: Readonly<Props>) {
    const controller = new AbortController()

    const [activeTab, setActiveTab] = useState<number>(0)
    const [progress, setProgress] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [video, setVideo] = useState<File | null>(null)
    const [preview, setPreview] = useState<File | null>(null)
    const [title, setTitle] = useState<string>("")
    const [activeChannel, setActiveChannel] = useState<ChannelForList | null>(null)
    const [activeSection, setActiveSection] = useState<Section | null>(null)
    const [tags, setTags] = useState<string[]>([])

    const tabs = [
        {
            title: 'Канал и плейлист'
        },
        {
            title: 'Основная информация'
        },
        {
            title: 'Теги'
        },
    ]

    const uploadVideo = async () => {
        if (!video || !title || !tags?.length || !activeChannel) return

        try {
            setIsLoading(true)

            const newVideo: Video = await apiUploadVideo(
                video,
                title,
                tags,
                activeChannel.id,
                activeSection?.id,
                preview ?? undefined,
                controller.signal,
                (percent) => setProgress(percent)
            )

            setIsVisible(false)
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <SettingsBlock isVisible={isVisible} setIsVisible={setIsVisible}>
            <SettingsBlock.Title>Загрузка видео</SettingsBlock.Title>

            <SettingsBlock.Content className="upload-video flex flex-column">
                {!isLoading && (
                    <>
                        <div className="upload-video__tabs flex flex-between mb-30">
                            {tabs?.map((tab, index) => (
                                <button
                                    className={`upload-video__tab hover-color-accent text-w500 ${activeTab === index ? 'is-active pointer-none' : ''}`}
                                    key={tab.title}
                                    type="button"
                                    onClick={() => setActiveTab(index)}
                                >
                                    {tab.title}
                                </button>
                            ))}
                        </div>

                        <Upload1 className={activeTab === 0 ? '' : 'visually-hidden'}
                                 activeChannel={activeChannel}
                                 setActiveChannel={setActiveChannel}
                                 activeSection={activeSection}
                                 setActiveSection={setActiveSection}
                        />
                        <Upload2 className={activeTab === 1 ? '' : 'visually-hidden'}
                                 video={video}
                                 setVideo={setVideo}
                                 preview={preview}
                                 setPreview={setPreview}
                                 title={title}
                                 setTitle={setTitle}
                        />
                        <Upload3 className={activeTab === 2 ? '' : 'visually-hidden'}
                                 tags={tags}
                                 setTags={setTags}
                        />
                    </>
                )}

                {isLoading && (
                    <span className="recolor-svg absolute-center">
                        <LoadingIcon size={64}/>
                    </span>
                )}

                <div className="row mt-auto">
                    <ButtonUi func={() => setIsVisible(false)}
                              className='col-6'
                    >
                        Отмена
                    </ButtonUi>
                    <ButtonUi func={uploadVideo}
                              className='col-6'
                              isLoading={isLoading}
                    >
                        Загрузить
                    </ButtonUi>
                </div>
            </SettingsBlock.Content>
        </SettingsBlock>
    )
}

export default UploadVideo;