import * as SQLite from "expo-sqlite";

let db = null;

export const getDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("solar_issues.db");
  }
  return db;
};

export const initDB = async () => {
  const database = await getDB();

  // Reports table
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      siteName TEXT,
      assetType TEXT,
      issueType TEXT,
      severity TEXT,
      comment TEXT,
      status TEXT,
      createdAt TEXT
    );
  `);

  //  Report Images table
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS report_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reportId INTEGER,
      imageUri TEXT,
      status TEXT,
      createdAt TEXT,
      FOREIGN KEY (reportId) REFERENCES reports (id)
    );
  `);
};
