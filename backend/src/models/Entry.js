import db from '../config/database.js';

export const Entry = {
  create(userId, entryData) {
    const { sleep, workHours, stress, deadlines, exercise, mood, score } = entryData;
    const stmt = db.prepare(
      `INSERT INTO burnout_entries 
       (user_id, sleep, work_hours, stress, deadlines, exercise, mood, score) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );
    const result = stmt.run(userId, sleep, workHours, stress, deadlines, exercise ? 1 : 0, mood, score);
    
    return {
      id: result.lastInsertRowid,
      user_id: userId,
      sleep,
      work_hours: workHours,
      stress,
      deadlines,
      exercise: exercise ? 1 : 0,
      mood,
      score,
      created_at: new Date().toISOString()
    };
  },

  findByUserId(userId) {
    const stmt = db.prepare('SELECT * FROM burnout_entries WHERE user_id = ? ORDER BY created_at ASC');
    return stmt.all(userId);
  },

  findById(id, userId) {
    const stmt = db.prepare('SELECT * FROM burnout_entries WHERE id = ? AND user_id = ?');
    return stmt.get(id, userId);
  },

  delete(id, userId) {
    const entry = this.findById(id, userId);
    if (entry) {
      const stmt = db.prepare('DELETE FROM burnout_entries WHERE id = ? AND user_id = ?');
      stmt.run(id, userId);
    }
    return entry;
  },

  getStats(userId) {
    const stmt = db.prepare(`
      SELECT 
        COUNT(*) as total_entries,
        AVG(score) as avg_score,
        MAX(score) as max_score,
        MIN(score) as min_score,
        AVG(sleep) as avg_sleep,
        AVG(work_hours) as avg_work_hours
      FROM burnout_entries 
      WHERE user_id = ?
    `);
    return stmt.get(userId);
  },
};