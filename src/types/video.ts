export interface Video {
    name: string;
    video: string | undefined;
    video_path: string;
    channel: string;
    date: string;
    avatar?: string;
    preview?: string;
}