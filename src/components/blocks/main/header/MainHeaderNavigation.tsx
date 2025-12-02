import {useNavigate} from "react-router-dom";

import {Video} from "../../../../types/video.ts";

import {useVideo} from "../../../../hooks/useVideo.ts";

import ArrowIcon from "../../../../assets/images/icons/ArrowIcon.tsx";

interface Props {
    isVideoPage?: boolean
}

function MainHeaderNavigation({isVideoPage = false}: Props) {
    const navigate = useNavigate();

    const {
        videoHistory,
        activeVideoFromHistory,
        setActiveVideoFromHistory,
        clearVideoHistory,
        setVideo,
    } = useVideo()

    const handleBack = (): void => {
        if (activeVideoFromHistory === 1) {
            navigate("/")

            clearVideoHistory()
            setActiveVideoFromHistory(0)
        } else {
            setActiveVideoFromHistory(activeVideoFromHistory - 1)

            setNewVideo()
        }
    }

    const handleForward = (): void => {
        if (activeVideoFromHistory < videoHistory.length) {
            setActiveVideoFromHistory(activeVideoFromHistory + 1)

            setNewVideo(false)
        }
    }

    const setNewVideo = (back: boolean = true): void => {
        const index = back ? activeVideoFromHistory - 2 : activeVideoFromHistory

        const newVideo: Video = videoHistory[index]

        setVideo(newVideo)
    }

    return (
        <>
            {isVideoPage &&
                <div className="header__btn-bar flex flex-align-center position-absolute">
                    <a className="header__back flex flex-align-center recolor-svg cursor-pointer"
                       onClick={handleBack}
                    >
                        <ArrowIcon/>
                        <span className="h5">Назад</span>
                    </a>

                    {videoHistory.length > 1 && activeVideoFromHistory < videoHistory.length && (
                        <a className="header__forward flex flex-align-center recolor-svg cursor-pointer"
                           onClick={handleForward}
                        >
                            <ArrowIcon/>
                            <span className="h5">Вперед</span>
                        </a>
                    )}
                </div>
            }
        </>
    )
}

export default MainHeaderNavigation;