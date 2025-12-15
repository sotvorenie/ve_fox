import Database from "@tauri-apps/plugin-sql";
import {appLocalDataDir, join} from "@tauri-apps/api/path";

const DB_NAME = "veFox.db"

let db: Database | null = null

export const tableNames: Record<string, string> = {
    history: "history",
    liked_videos: "liked_videos",
    watch_later: "watch_later",
}

export const openDB = async () => {
    try {
        if (db) return db;

        const dir = await appLocalDataDir();
        const dbPath = await join(dir, DB_NAME);
        const url = `sqlite://${dbPath.replace(/\\/g, "/")}`;
        db = await Database.load(url);

        return db;
    } catch (err) {
        throw err
    }
}

export const executeSQL = async (sql: string, values: any[] = []) => {
    try {
        const database = await openDB();
        await database.execute(sql, values);
    } catch (err) {
        throw err
    }
};

export const selectSQL = async <T = any>(
    sql: string,
    values: any[] = []
): Promise<T[]> => {
    try {
        const database = await openDB();
        return database.select<T[]>(sql, values);
    } catch (err) {
        throw err
    }
};

export const initDB = async () => {
    await executeSQL(`
    CREATE TABLE IF NOT EXISTS history (
      name TEXT,
      video_path TEXT PRIMARY KEY,
      channel TEXT,
      date TEXT,
      avatar TEXT,
      preview TEXT,
      created_at INTEGER
    )
  `)

    await executeSQL(`
    CREATE TABLE IF NOT EXISTS liked_videos (
      name TEXT,
      video_path TEXT PRIMARY KEY,
      channel TEXT,
      date TEXT,
      avatar TEXT,
      preview TEXT,
      created_at INTEGER
    )
  `)

    await executeSQL(`
    CREATE TABLE IF NOT EXISTS watch_later (
      name TEXT,
      video_path TEXT PRIMARY KEY,
      channel TEXT,
      date TEXT,
      avatar TEXT,
      preview TEXT,
      created_at INTEGER
    )
  `)

    await executeSQL(`
    CREATE TABLE IF NOT EXISTS video_watch_times (
      video_path PRIMARY KEY,
      time TEXT
    )
  `)
}