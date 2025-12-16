import {useEffect, useRef, useState} from "react";
import {open} from "@tauri-apps/plugin-dialog";
import {message} from "@tauri-apps/plugin-dialog";

import {Channel} from "../../../types/channel.ts";

import {apiUploadVideo} from "../../../api/upload/upload.ts";

import Modal from "../../common/Modal.tsx";

import HeaderChannelsList from "./HeaderChannelsList.tsx";

import UploadIcon from "../../../assets/images/icons/UploadIcon.tsx";
import LoadingIcon from "../../../assets/images/icons/LoadingIcon.tsx";

function HeaderUpload() {

    const [loadVideoModalVisible, setLoadVideoModalVisible] = useState(false)

    const [loadingModalVisible, setLoadingModalVisible] = useState<boolean>(false)

    const [channelsModalVisible, setChannelsModalVisible] = useState(false)
    const [isError, setIsError] = useState(false)
    const [channel, setChannel] = useState<Channel>({name: '', avatar: '', date: ''});

    const nameInput = useRef<HTMLInputElement>(null);
    const [name, setName] = useState("")

    const [video, setVideo] = useState<string>("");
    const [preview, setPreview] = useState<string>("");

    const [submitVisible, setSubmitVisible] = useState<boolean>(false)

    const handleName = () => {
        if (!nameInput.current?.value) return

        setName(nameInput.current.value)
    }

    const uploadVideo = async () => {
        const path = await open({
            multiple: false,
            filters: [
                { name: "Видео", extensions: ["mp4", "mkv", "avi", "mov"] },
            ]
        })

        if (typeof path === "string") {
            setVideo(path);
        }
    }

    const uploadPreview = async () => {
        const path = await open({
            multiple: false,
            filters: [{ name: "Фото", extensions: ["jpg", "jpeg", "png", "webp"] }],
        });

        if (typeof path === "string") {
            setPreview(path);
        }
    }

    const handleClear = () => {
        if (!nameInput.current?.value) return

        setVideo('')
        setName('')
        setPreview('')
        setChannel({name: '', avatar: '', date: ''})
        nameInput.current.value = ''
    }

    const handleSubmit = async () => {
        try {
            setLoadingModalVisible(true)

            await apiUploadVideo(name, channel.name, video, preview)

            handleClear()
        } catch (err: any) {
            if (err.message.includes("Канал не найден")) {
                await message(err.message, `Ошибка!! ${err.message}`);
            } else if (err.message.includes("Видео не найдено")) {
                await message(err.message, `Ошибка!! ${err.message}`);
            } else if (err.message.includes("Некорректный формат видео")) {
                await message(err.message, `Ошибка!! ${err.message}`);
            } else if (err.message.includes("Такое видео уже есть")) {
                await message(err.message, `Ошибка!! ${err.message}`)
            } else {
                setIsError(true)
            }
        } finally {
            setLoadingModalVisible(false)
        }
    }

    useEffect(() => {
        if (name && video && channel.name) {
            setSubmitVisible(true)
        } else {
            setSubmitVisible(false)
        }
    }, [name, video, channel.name]);

    return (
        <>
            <Modal visible={loadVideoModalVisible} setVisible={setLoadVideoModalVisible}>
                <Modal.Trigger open={() => setLoadVideoModalVisible(true)}>
                    <button className="hover-color-accent" type="button">
                        Загрузить видео
                    </button>
                </Modal.Trigger>

                {loadVideoModalVisible && (
                    <Modal.Content close={() => setLoadVideoModalVisible(false)}>
                        {!isError && (
                            <>
                                <button className="upload__open text-w600"
                                        type="button"
                                        onClick={() => setChannelsModalVisible(true)}
                                >
                                    {channel?.name ? 'изменить канал' : 'выбрать канал'}
                                </button>

                                {channel?.name && (
                                    <div className="upload__channel flex flex-align-center">
                                        <img src={channel?.avatar} alt={channel?.name}/>
                                        {channel.name}
                                    </div>
                                )}

                                <form className="upload__form" onSubmit={(e) => {
                                    e.preventDefault()
                                    handleSubmit()
                                }}>
                                    <label className="upload__label">
                                        <p>Название видео:</p>
                                        <input className="upload__input input"
                                               type="text"
                                               ref={nameInput}
                                               onChange={handleName}
                                        />
                                    </label>

                                    <label className="upload__label">
                                        <p className="one-line">
                                            {video ? 'Выбрано видео:' : 'Выбрать видео'}
                                            <span title={video}>{video}</span>
                                        </p>
                                        <button className="upload__file recolor-svg hover-color-accent flex-center"
                                                type="button"
                                                onClick={uploadVideo}
                                        >
                                            {video ? 'Изменить' : 'Загрузить'} видео<UploadIcon/>
                                        </button>
                                    </label>

                                    <label className="upload__label">
                                        <p className="one-line">
                                            {preview ? 'Выбрано превью:' : 'Выбрать превью'}
                                            <span title={preview}>{preview}</span>
                                        </p>
                                        <button className="upload__file recolor-svg hover-color-accent flex-center"
                                                type="button"
                                                onClick={uploadPreview}
                                        >
                                            {preview ? 'Изменить' : 'Загрузить'} фото<UploadIcon/>
                                        </button>
                                    </label>

                                    <div className="upload__btn-bar flex">
                                        <button className="upload__button"
                                                type="submit"
                                                disabled={!submitVisible}
                                        >Готово
                                        </button>
                                        <button className="upload__button"
                                                type="button"
                                                onClick={handleClear}
                                        >Очистить
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}

                        {isError && <p>что-то не так...</p>}
                    </Modal.Content>
                )}
            </Modal>

            <HeaderChannelsList channelsModalVisible={channelsModalVisible}
                                setChannelsModalVisible={setChannelsModalVisible}
                                setIsError={setIsError}
                                channel={channel}
                                setChannel={setChannel}
            />

            <Modal visible={loadingModalVisible} setVisible={setLoadVideoModalVisible}>
                {loadingModalVisible && (
                    <Modal.Content close={() => setLoadVideoModalVisible(false)}
                                   isSmall={true}
                                   closeActive={!loadingModalVisible}
                    >
                        <div className="upload__loading recolor-svg flex-center">
                            <LoadingIcon/>
                        </div>
                    </Modal.Content>
                )}
            </Modal>
        </>
    )
}

export default HeaderUpload;