import {selectSQL} from "../database.ts";
import {tableNames} from "../database.ts";

export const check = async (videoPath: string, tableName: string): Promise<boolean> => {
    try {
        const name: string = tableNames[tableName]

        const result = await selectSQL<{ total: number }>(
            `SELECT COUNT(*) AS total FROM ${name} WHERE video_path = ?`,
            [videoPath]
        )

        return (result[0]?.total ?? 0) > 0
    } catch (err) {
        return false
    }
}