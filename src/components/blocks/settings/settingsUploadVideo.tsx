import {useState} from "react";

import SettingsBlock from "./settingsBlock.tsx";

import SettingsUpload1 from "./settingsUpload-1.tsx";
import SettingsUpload2 from "./settingsUpload-2.tsx";
import SettingsUpload3 from "./settingsUpload-3.tsx";
import ButtonUi from "../../ui/ButtonUi.tsx";

interface Props {
    isVisible: boolean
    setIsVisible: (value:boolean) => void
}

function SettingsUploadVideo({isVisible, setIsVisible}: Readonly<Props>) {
    const [activeTab, setActiveTab] = useState<number>(0)

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

    const pages = [
        {
            key: 'page-1',
            Component: SettingsUpload1,
        },
        {
            key: 'page-2',
            Component: SettingsUpload2,
        },
        {
            key: 'page-3',
            Component: SettingsUpload3,
        },
    ]

    return (
        <SettingsBlock isVisible={isVisible} setIsVisible={setIsVisible}>
            <SettingsBlock.Title>Загрузка видео</SettingsBlock.Title>

            <SettingsBlock.Content className="upload-video flex flex-column">
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

                {pages?.map((Page, index) => (
                    <Page.Component key={Page.key} className={activeTab === index ? '' : 'visually-hidden'}/>
                ))}

                <div className="row mt-auto">
                    <ButtonUi func={() => setIsVisible(false)} className='col-6'>Отмена</ButtonUi>
                    <ButtonUi func={() => setIsVisible(false)} className='col-6'>Загрузить</ButtonUi>
                </div>
            </SettingsBlock.Content>
        </SettingsBlock>
    )
}

export default SettingsUploadVideo;