import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

let pool = null;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'rakshika_db',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  });

  // Verify connection asynchronously
  pool.getConnection()
    .then((conn) => {
      console.log('✅ Connected to MySQL Database (rakshika_db)');
      conn.release();
    })
    .catch((err) => {
      console.warn('⚠️ MySQL connection note: Could not connect to local MySQL database server (' + err.message + '). In-memory cache & fallback storage active.');
    });
} catch (error) {
  console.warn('⚠️ Database pool initialization warning:', error.message);
}

export default pool;
