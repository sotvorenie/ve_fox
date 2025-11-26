import MainHeader from "../components/blocks/main/MainHeader.tsx";
import MainVideo from "../components/blocks/main/video/MainVideo.tsx";
import MainRecommended from "../components/blocks/main/video/MainRecommended.tsx";


function VideoPage() {

    return(
        <div className="video-page">
            <MainHeader backVisible={true}/>

            <div className="video-page__content flex">
                <MainVideo/>

                <MainRecommended/>
            </div>
        </div>
    );
}

export default VideoPage;