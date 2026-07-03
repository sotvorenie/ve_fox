import {useRef} from "react";

import SettingsIcon from "@icons/video-player/SettingsIcon.tsx";
import ReduceIcon from "@icons/video-player/ReduceIcon.tsx";
import ExpandIcon from "@icons/video-player/ExpandIcon.tsx";

import {usePlayerStore} from "@store/usePlayerStore.ts";

interface Props {
    setIsShowSettings: (value: any) => void
}

function VideoPlayerRightButtons({setIsShowSettings}: Readonly<Props>) {
    const {isFullscreen} = usePlayerStore()
    const {toggleIsFullscreen} = usePlayerStore()

    const settingsBtnRef = useRef<HTMLButtonElement | null>(null)

    return (
        <div className="video-player__right flex flex-align-center">
            <button
                className="video-player__line-settings video-player__line-item video-player__background recolor-svg i-svg z-1000"
                type="button"
                title="Настройки"
                onClick={() => setIsShowSettings(true)}
                ref={settingsBtnRef}
            >
                <SettingsIcon/>
            </button>

            <button className="video-player__line-item video-player__background recolor-svg i-svg"
                    type="button"
                    onClick={() => toggleIsFullscreen()}
            >
                {isFullscreen ? <ReduceIcon/> : <ExpandIcon/>}
            </button>
        </div>
    )
}

export default VideoPlayerRightButtons;