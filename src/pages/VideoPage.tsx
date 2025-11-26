import MainHeader from "../components/blocks/main/MainHeader.tsx";
import VideoVideo from "../components/blocks/video/VideoVideo.tsx";
import VideoRecommended from "../components/blocks/video/VideoRecommended.tsx";


function VideoPage() {

    return(
        <div className="video-page">
            <MainHeader backVisible={true}/>

            <div className="video-page__content flex">
                <VideoVideo/>

                <VideoRecommended/>
            </div>
        </div>
    );
}

export default VideoPage;