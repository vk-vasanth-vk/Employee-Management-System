// db.ts
import { config } from 'dotenv'; // Import dotenv config function
import mysql from 'mysql2/promise'; // Import mysql2's promise-based API

config(); // Load environment variables from .env file

// Create a connection pool (recommended for handling multiple requests)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Function to fetch data
export async function getEmployees() {
  try {
    const [rows] = await pool.execute('SELECT * FROM employee');
    console.log('Employees:', rows);
    return rows;
  } catch (err) {
    console.error('Error fetching employees:', err);
  }
}
