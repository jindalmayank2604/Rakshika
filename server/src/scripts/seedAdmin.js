import bcrypt from 'bcryptjs';
import { query, pool } from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config();

async function seedAdmin() {
  const name = process.env.ADMIN_NAME || 'WeSafe Administrator';
  const email = (process.env.ADMIN_EMAIL || 'admin@wesafe.org').toLowerCase();
  const phone = process.env.ADMIN_PHONE || '+91 9999999999';
  const password = process.env.ADMIN_PASSWORD || 'AdminSecure2026!';

  try {
    console.log(`Checking admin existence for ${email}...`);
    const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    if (existing.rows && existing.rows.length > 0) {
      console.log(`Admin account exists (ID: ${existing.rows[0].id}). Updating credentials and role...`);
      await query(
        'UPDATE users SET role = $1, password_hash = $2, name = $3, updated_at = CURRENT_TIMESTAMP WHERE email = $4',
        ['admin', hash, name, email]
      );
      console.log('✅ Admin user updated successfully.');
    } else {
      console.log('Creating new admin user...');
      const res = await query(
        'INSERT INTO users (name, email, phone, password_hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [name, email, phone, hash, 'admin']
      );
      console.log(`✅ Admin user created with ID: ${res.rows[0].id}`);
    }
  } catch (err) {
    console.error('❌ Failed to seed admin:', err.message);
  } finally {
    await pool.end();
  }
}

seedAdmin();
