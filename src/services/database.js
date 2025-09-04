// Database connection utility for Affinity Tax Services
import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || '195.250.21.159',
  user: process.env.DB_USER || 'affinitytaxservi_admin',
  password: process.env.DB_PASSWORD || 'WTxTB@j5853e',
  database: process.env.DB_NAME || 'affinitytaxservi_demo',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create a connection pool
let pool;

/**
 * Initialize the database connection pool
 */
export const initializeDatabase = async () => {
  try {
    pool = mysql.createPool(dbConfig);
    console.log('Database connection pool initialized');
    
    // Test the connection
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
};

/**
 * Execute a database query
 * @param {string} sql - SQL query to execute
 * @param {Array} params - Parameters for the query
 * @returns {Promise<Array>} - Query results
 */
export const query = async (sql, params = []) => {
  try {
    if (!pool) await initializeDatabase();
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Query error:', error.message);
    throw error;
  }
};

/**
 * Get a single record by ID
 * @param {string} table - Table name
 * @param {number|string} id - Record ID
 * @returns {Promise<Object>} - Record object
 */
export const getById = async (table, id) => {
  const sql = `SELECT * FROM ${table} WHERE id = ?`;
  const results = await query(sql, [id]);
  return results[0];
};

/**
 * Insert a record into a table
 * @param {string} table - Table name
 * @param {Object} data - Record data
 * @returns {Promise<Object>} - Insert result
 */
export const insert = async (table, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => '?').join(', ');
  
  const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
  return await query(sql, values);
};

/**
 * Update a record in a table
 * @param {string} table - Table name
 * @param {number|string} id - Record ID
 * @param {Object} data - Record data
 * @returns {Promise<Object>} - Update result
 */
export const update = async (table, id, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setClause = keys.map(key => `${key} = ?`).join(', ');
  
  const sql = `UPDATE ${table} SET ${setClause} WHERE id = ?`;
  return await query(sql, [...values, id]);
};

/**
 * Delete a record from a table
 * @param {string} table - Table name
 * @param {number|string} id - Record ID
 * @returns {Promise<Object>} - Delete result
 */
export const remove = async (table, id) => {
  const sql = `DELETE FROM ${table} WHERE id = ?`;
  return await query(sql, [id]);
};

export default {
  initializeDatabase,
  query,
  getById,
  insert,
  update,
  remove
};