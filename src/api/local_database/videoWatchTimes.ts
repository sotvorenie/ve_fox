import {executeSQL, selectSQL} from "../database.ts";

export const setTimeToWatchTime = async (videoPath: string, time: number): Promise<void> => {
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

export const getTimeFromWatchTime = async (videoPath: string): Promise<number> => {
    try {
        const info = await selectSQL<{video_path: string; time: string}>(
            `SELECT * FROM video_watch_times WHERE video_path = ?`,
            [videoPath]
        )

        return +info[0].time
    } catch (err) {
        throw err
    }
}

export const removeTimeFromWatchTime = async (videoPath: string): Promise<void> => {
    try {
        await executeSQL(
            `DELETE FROM video_watch_times WHERE video_path = ?`,
            [videoPath]
        )
    } catch (err) {
        throw err
    }
}