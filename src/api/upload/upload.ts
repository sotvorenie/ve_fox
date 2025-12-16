import {url} from "../index.ts";

export const apiUploadVideo = async (
    title: string,
    channel: string,
    video_path: string,
    preview_path: string
) => {
    const data = { title, channel, video_path, preview_path };

    const response = await fetch(`${url}/upload_video`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        let errMsg = "Неизвестная ошибка";
        try {
            const errData = await response.json();
            errMsg = errData.detail || JSON.stringify(errData);
        } catch {}
        throw new Error(errMsg);
    }

    return response.json();
};
