// User model for Affinity Tax Services

/**
 * User schema representation
 * This maps to the 'users' table in the database
 * 
 * @typedef {Object} User
 * @property {number} id - Unique identifier
 * @property {string} email - User's email address (unique)
 * @property {string} password - Hashed password
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} role - User role (client, admin, tax_professional)
 * @property {string} phone - User's phone number
 * @property {string} address - User's address
 * @property {string} city - User's city
 * @property {string} state - User's state
 * @property {string} zipCode - User's zip code
 * @property {Date} createdAt - Account creation date
 * @property {Date} updatedAt - Last update date
 */

import { query, getById, insert, update, remove } from '../services/database';

const TABLE_NAME = 'users';

/**
 * Get a user by ID
 * @param {number} id - User ID
 * @returns {Promise<User>} User object
 */
export const getUserById = async (id) => {
  return await getById(TABLE_NAME, id);
};

/**
 * Get a user by email
 * @param {string} email - User email
 * @returns {Promise<User>} User object
 */
export const getUserByEmail = async (email) => {
  const sql = `SELECT * FROM ${TABLE_NAME} WHERE email = ?`;
  const results = await query(sql, [email]);
  return results[0];
};

/**
 * Create a new user
 * @param {Object} userData - User data
 * @returns {Promise<Object>} Insert result
 */
export const createUser = async (userData) => {
  // Add timestamps
  const now = new Date();
  const data = {
    ...userData,
    createdAt: now,
    updatedAt: now
  };
  
  return await insert(TABLE_NAME, data);
};

/**
 * Update a user
 * @param {number} id - User ID
 * @param {Object} userData - User data to update
 * @returns {Promise<Object>} Update result
 */
export const updateUser = async (id, userData) => {
  // Add updated timestamp
  const data = {
    ...userData,
    updatedAt: new Date()
  };
  
  return await update(TABLE_NAME, id, data);
};

/**
 * Delete a user
 * @param {number} id - User ID
 * @returns {Promise<Object>} Delete result
 */
export const deleteUser = async (id) => {
  return await remove(TABLE_NAME, id);
};

/**
 * Authenticate a user
 * @param {string} email - User email
 * @param {string} password - User password (plain text)
 * @returns {Promise<User|null>} User object if authenticated, null otherwise
 */
export const authenticateUser = async (email, _password) => {
  // In a real implementation, you would:
  // 1. Get the user by email
  // 2. Compare the hashed password
  // 3. Return the user if passwords match, null otherwise
  
  // This is a placeholder for demonstration
  const sql = `SELECT * FROM ${TABLE_NAME} WHERE email = ?`;
  const results = await query(sql, [email]);
  const user = results[0];
  
  if (!user) return null;
  
  // In a real implementation, you would use a proper password comparison
  // like bcrypt.compare(password, user.password)
  // TODO: Implement actual password validation using the password parameter
  const passwordMatches = true; // Placeholder - should validate: password
  
  return passwordMatches ? user : null;
};

export default {
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  authenticateUser
};