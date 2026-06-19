import {useState} from "react";

import PlusIcon from "../../../assets/images/icons/PlusIcon.tsx";
import CrossIcon from "../../../assets/images/icons/CrossIcon.tsx";

interface Props {
    className: string
}

function SettingsUpload3({className}: Readonly<Props>) {
    const [videoTag, setVideoTag] = useState<string>("")
    const [tagsList, setTagsList] = useState<string[]>([])

    const addTag = () => {
        const newTag = videoTag.trim()

        if (!newTag) return


        setTagsList(prev => [videoTag, ...prev])
        setVideoTag('')
    }

    const removeTag = (index: number) => {
        setTagsList(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <div className={`upload-video__tags ${className}`}>
            <div className="upload-video__tags-head flex mb-30">
                <div className="upload-video__tags-input-wrapper position-relative w-100">
                    <input
                        className="upload-video__tags-input input__inp w-100"
                        type="text"
                        placeholder="Введите тег.."
                        value={videoTag}
                        onChange={(e) => setVideoTag(e.target.value)}
                    />

                    {videoTag?.length > 0 && (
                        <button className="upload-video__tags-clear recolor-svg hover-color-accent"
                                type="button"
                                onClick={() => setVideoTag('')}
                        >
                            <CrossIcon/>
                        </button>
                    )}
                </div>

                <button className="upload-video__tags-btn recolor-svg hover-color-accent flex-center"
                        type="button"
                        onClick={addTag}
                >
                    <span>Добавить</span>
                    <PlusIcon/>
                </button>
            </div>

            {tagsList?.length > 0 && (
                <ul className="upload-video__tags-list flex flex-wrap">
                    {tagsList.map((tag: string, index: number) => (
                        <li key={`${tag}-${index}`}
                            className="upload-video__tags-item flex flex-align-center"
                        >
                            <span>{tag}</span>

                            <button className="recolor-svg hover-color-accent"
                                    type="button"
                                    onClick={() => removeTag(index)}
                            >
                                <CrossIcon/>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SettingsUpload3;