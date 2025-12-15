import {executeSQL, selectSQL} from "../database.ts";

export const setTimeToWatchTime = async (videoPath: string, time: string): Promise<void> => {
    try {
        await executeSQL(
            `INSERT INTO video_watch_times (video_path, time)
           VALUES (?, ?)
           ON CONFLICT(video_path)
           DO UPDATE SET time = excluded.time`,
            [videoPath, time]
        )
    } catch (err) {
        throw err
    }
}

export const getTimeFromWatchTime = async (videoPath: string): Promise<string> => {
    try {
        const info = await selectSQL<string>(
            `SELECT * FROM video_watch_times WHERE video_path = ?`,
            [videoPath]
        )

        return info[0]
    } catch (err) {
        throw err
    }
}