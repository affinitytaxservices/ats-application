// Tax Return model for Affinity Tax Services

/**
 * Tax Return schema representation
 * This maps to the 'tax_returns' table in the database
 * 
 * @typedef {Object} TaxReturn
 * @property {number} id - Unique identifier
 * @property {number} userId - User ID (foreign key)
 * @property {string} taxYear - Tax year
 * @property {string} status - Status (draft, submitted, processing, completed, rejected)
 * @property {number} totalIncome - Total income amount
 * @property {number} totalDeductions - Total deductions amount
 * @property {number} taxableIncome - Taxable income amount
 * @property {number} taxDue - Tax due amount
 * @property {number} refundAmount - Refund amount
 * @property {Date} filingDate - Date filed
 * @property {Date} completionDate - Date completed
 * @property {string} notes - Additional notes
 * @property {Date} createdAt - Creation date
 * @property {Date} updatedAt - Last update date
 */

// Database imports removed for client-side compatibility
// import { query, getById, insert, update, remove } from '../services/database';

const TABLE_NAME = 'tax_returns';

/**
 * Get a tax return by ID
 * @param {number} id - Tax return ID
 * @returns {Promise<TaxReturn>} Tax return object
 */
export const getTaxReturnById = async (id) => {
  return await getById(TABLE_NAME, id);
};

/**
 * Get all tax returns for a user
 * @param {number} userId - User ID
 * @returns {Promise<Array<TaxReturn>>} Array of tax return objects
 */
export const getTaxReturnsByUserId = async (userId) => {
  const sql = `SELECT * FROM ${TABLE_NAME} WHERE userId = ? ORDER BY taxYear DESC`;
  return await query(sql, [userId]);
};

/**
 * Get a tax return for a specific year and user
 * @param {number} userId - User ID
 * @param {string} taxYear - Tax year
 * @returns {Promise<TaxReturn>} Tax return object
 */
export const getTaxReturnByYear = async (userId, taxYear) => {
  const sql = `SELECT * FROM ${TABLE_NAME} WHERE userId = ? AND taxYear = ?`;
  const results = await query(sql, [userId, taxYear]);
  return results[0];
};

/**
 * Get tax returns by status
 * @param {string} status - Status to filter by
 * @returns {Promise<Array<TaxReturn>>} Array of tax return objects
 */
export const getTaxReturnsByStatus = async (status) => {
  const sql = `SELECT * FROM ${TABLE_NAME} WHERE status = ? ORDER BY updatedAt DESC`;
  return await query(sql, [status]);
};

/**
 * Create a new tax return
 * @param {Object} taxReturnData - Tax return data
 * @returns {Promise<Object>} Insert result
 */
export const createTaxReturn = async (taxReturnData) => {
  // Add timestamps
  const now = new Date();
  const data = {
    ...taxReturnData,
    createdAt: now,
    updatedAt: now,
    status: taxReturnData.status || 'draft'
  };
  
  return await insert(TABLE_NAME, data);
};

/**
 * Update a tax return
 * @param {number} id - Tax return ID
 * @param {Object} taxReturnData - Tax return data to update
 * @returns {Promise<Object>} Update result
 */
export const updateTaxReturn = async (id, taxReturnData) => {
  // Add updated timestamp
  const data = {
    ...taxReturnData,
    updatedAt: new Date()
  };
  
  return await update(TABLE_NAME, id, data);
};

/**
 * Update tax return status
 * @param {number} id - Tax return ID
 * @param {string} status - New status
 * @param {string} notes - Optional notes
 * @returns {Promise<Object>} Update result
 */
export const updateTaxReturnStatus = async (id, status, notes = null) => {
  const data = {
    status,
    updatedAt: new Date()
  };
  
  if (status === 'completed') {
    data.completionDate = new Date();
  } else if (status === 'submitted') {
    data.filingDate = new Date();
  }
  
  if (notes) {
    data.notes = notes;
  }
  
  return await update(TABLE_NAME, id, data);
};

/**
 * Delete a tax return
 * @param {number} id - Tax return ID
 * @returns {Promise<Object>} Delete result
 */
export const deleteTaxReturn = async (id) => {
  return await remove(TABLE_NAME, id);
};

export default {
  getTaxReturnById,
  getTaxReturnsByUserId,
  getTaxReturnByYear,
  getTaxReturnsByStatus,
  createTaxReturn,
  updateTaxReturn,
  updateTaxReturnStatus,
  deleteTaxReturn
};