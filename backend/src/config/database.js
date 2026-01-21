import Database from 'better-sqlite3';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create database file in backend folder
const dbPath = join(__dirname, '..', '..', 'burnout.db');
const db = new Database(dbPath);

console.log('✅ Connected to SQLite database at:', dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

export const initDatabase = () => {
  try {
    // Create users table
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create burnout_entries table
    db.exec(`
      CREATE TABLE IF NOT EXISTS burnout_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        sleep REAL NOT NULL,
        work_hours REAL NOT NULL,
        stress INTEGER NOT NULL CHECK (stress >= 1 AND stress <= 5),
        deadlines INTEGER NOT NULL,
        exercise INTEGER NOT NULL,
        mood INTEGER NOT NULL CHECK (mood >= 1 AND mood <= 5),
        score REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Create indexes
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_entries_user_id ON burnout_entries(user_id);
      CREATE INDEX IF NOT EXISTS idx_entries_created_at ON burnout_entries(created_at);
    `);

    console.log('✅ Database tables initialized');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};

export default db;