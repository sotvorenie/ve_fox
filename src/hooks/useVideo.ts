import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../store";
import {Video} from "../types/video.ts";
import {ResponseVideos} from "../types/responseVideos.ts";
import {
    setVideo,
    setIsLoading,
    setRecommendedHasMore,
    setRecommendedVideos,
    setRecommendedIsLoading
} from "../store/useVideoStore.ts";
import {apiGetVideo} from "../api/video/video.ts";
import {apiGetRecommendedVideos} from "../api/recommended/recommended.ts";

export const useVideo = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        video,
        isLoading,
        recommendedHasMore,
        recommendedIsLoading,
        recommendedVideos
    } = useSelector((state: RootState) => state.video);

    const getVideo = async (path: string) => {
        try {
            dispatch(setIsLoading(true))
            dispatch(setVideo({name: '', video: undefined, video_path: '', channel: '', date: ''}))

            const data: Video = await apiGetVideo(path)

            if (data) {
                dispatch(setVideo(data))

                await getRecommendedVideos(1, data)
            }
        } catch (err) {

        } finally {
            dispatch(setIsLoading(false))
        }
    }

    const getRecommendedVideos = async (page: number = 1, videoData?: Video) => {
        try {
            dispatch(setRecommendedIsLoading(true))

            const targetVideo = videoData || video

            if (!targetVideo?.name || !targetVideo?.channel) {
                return
            }

            const data: ResponseVideos = await apiGetRecommendedVideos(targetVideo.name, targetVideo.channel, page)

            if (data) {
                dispatch(setRecommendedVideos(data.videos))

                dispatch(setRecommendedHasMore(data.has_more))
            }

            return data?.page || 0
        } catch (err) {

        } finally {
            dispatch(setRecommendedIsLoading(false))
        }
    }

    return {
        video,
        isLoading,
        recommendedHasMore,
        recommendedVideos,
        recommendedIsLoading,

        setVideo: (video: Video) => dispatch(setVideo(video)),

        setRecommendedVideos: (videos: Video[]) => dispatch(setRecommendedVideos(videos)),
        setRecommendedIsLoading: (isLoading: boolean) => dispatch(setRecommendedIsLoading(isLoading)),
        setRecommendedHasMore: (hasMore: boolean) => dispatch(setRecommendedHasMore(hasMore)),

        getVideo,
        getRecommendedVideos,
    }
}