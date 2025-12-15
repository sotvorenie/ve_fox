import {Video} from "../../types/video.ts";
import {executeSQL, selectSQL} from "../database.ts";
import {Meta} from "../../types/meta.ts";
import {tableNames} from "../database.ts";

export const setVideoToTable = async (video: Video, tableName: string): Promise<void> => {
    try {
        const name: string = tableNames[tableName]

        await executeSQL(
            `DELETE FROM ${name} WHERE video_path = ?`,
            [video.video_path]
        )

        await executeSQL(
            `
    INSERT INTO ${name}
    (name, video_path, channel, date, avatar, preview, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(video_path)
    DO UPDATE SET 
        name = excluded.name,
    channel = excluded.channel,
    date = excluded.date,
    avatar = excluded.avatar,
    preview = excluded.preview,
    created_at = excluded.created_at`,
            [
                video.name,
                video.video_path,
                video.channel,
                video.date,
                video.avatar,
                video.preview,
                Date.now()
            ]
        )
    } catch (_) {}
}

export const removeVideoFromTable = async (video_path: string, tableName: string): Promise<void> => {
    try {
        const name: string = tableNames[tableName]

        await executeSQL(
            `DELETE FROM ${name} WHERE video_path = ?`,
            [video_path]
        )
    } catch (_) {}
}

export const getVideosFromTable = async (page: number, tableName: string): Promise<{meta: Meta, videos: Video[]}> => {
    try {
        const name: string = tableNames[tableName]

        const limit = 9
        const offset = (page - 1) * limit

        const videos = await selectSQL<Video>(
            `SELECT * FROM ${name} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
            [limit, offset]
        )

        const countRows = await selectSQL<{ total: number }>(
            `SELECT COUNT(*) AS total FROM ${name}`
        )

        const total: number = countRows[0]?.total ?? 0

        const meta: Meta = {
            current_page: page,
            from: total === 0 ? 0 : offset + 1,
            to: Math.min(offset + limit, total),
            total,
            per_page: limit,
            has_more: page < Math.ceil(total / limit)
        }

        return {meta, videos}
    } catch (err) {
        throw err
    }
}