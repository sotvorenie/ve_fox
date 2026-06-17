import {useRef, useState} from "react";

import InputUi from "../../ui/InputUi.tsx";

import VideoFileIcon from "../../../assets/images/icons/VideoFileIcon.tsx";
import PhotoFileIcon from "../../../assets/images/icons/PhotoFileIcon.tsx";

function SettingsUpload2() {
    const videoInputRef = useRef<HTMLInputElement | null>(null);
    const previewInputRef = useRef<HTMLInputElement | null>(null);

    const [videoName, setVideoName] = useState<string>("")

    return (
        <>
            <InputUi
                className="mb-20"
                name="video"
                id="video"
                title="Название видео"
                value={videoName}
                setValue={setVideoName}
                maxLength={100}
            />

            <div className="row">
                <button className="upload-video__file flex-center recolor-svg hover-color-accent col-6"
                        type="button">
                    <input
                        type="file"
                        accept="video/*"
                        ref={videoInputRef}
                        className="visually-hidden"
                    />

                    <div className="upload-video__file-info">
                        <VideoFileIcon/>
                        <p>Загрузить видео</p>
                    </div>
                </button>
                <button className="upload-video__file flex-center recolor-svg hover-color-accent col-6"
                        type="button">
                    <input
                        type="file"
                        accept="image/*"
                        ref={previewInputRef}
                        className="visually-hidden"
                    />

                    <div className="upload-video__file-info">
                        <PhotoFileIcon/>
                        <p>Загрузить Превью</p>
                    </div>
                </button>
            </div>
        </>
    )
}

export default SettingsUpload2;