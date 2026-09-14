import app from './app.js';
import { initDb } from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialize Database connection and schema
initDb().catch(err => console.error('Database initialization error:', err));

app.listen(PORT, () => {
  console.log(`🛡️ Rakshika Server running securely on port ${PORT}`);
  console.log(`📡 Health endpoint: http://localhost:${PORT}/api/health`);
});

