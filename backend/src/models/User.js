import db from '../config/database.js';
import bcrypt from 'bcrypt';

export const User = {
  create(email, password, fullName) {
    const passwordHash = bcrypt.hashSync(password, 10);
    const stmt = db.prepare(
      'INSERT INTO users (email, password_hash, full_name) VALUES (?, ?, ?)'
    );
    const result = stmt.run(email, passwordHash, fullName);
    
    return {
      id: result.lastInsertRowid,
      email,
      full_name: fullName,
      created_at: new Date().toISOString()
    };
  },

  findByEmail(email) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
  },

  findById(id) {
    const stmt = db.prepare('SELECT id, email, full_name, created_at FROM users WHERE id = ?');
    return stmt.get(id);
  },

  verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  },
};