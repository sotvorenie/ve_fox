import {useRef} from "react";

import InputUi from "@/components/ui/InputUi.tsx";

import VideoFileIcon from "@/assets/images/icons/VideoFileIcon.tsx";
import PhotoFileIcon from "@/assets/images/icons/PhotoFileIcon.tsx";

interface Props {
    className: string
    video: File | null
    setVideo: (video: File | null) => void
    preview: File | null
    setPreview: (preview: File | null) => void
    title: string
    setTitle: (title: string) => void
}

function Upload2({className, video, setVideo, preview, setPreview, title, setTitle}: Readonly<Props>) {
    const videoInputRef = useRef<HTMLInputElement | null>(null);
    const previewInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className={className}>
            <InputUi
                className="mb-20"
                name="video"
                id="video"
                title="Название видео"
                value={title}
                setValue={setTitle}
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
        </div>
    )
}

export default Upload2;