// Tax Document model for Affinity Tax Services

/**
 * Tax Document schema representation
 * This maps to the 'tax_documents' table in the database
 * 
 * @typedef {Object} TaxDocument
 * @property {number} id - Unique identifier
 * @property {number} userId - User ID (foreign key)
 * @property {string} documentType - Type of document (W2, 1099, etc.)
 * @property {string} fileName - Original file name
 * @property {string} filePath - Path to stored file
 * @property {string} fileSize - Size of file in bytes
 * @property {string} mimeType - File MIME type
 * @property {string} taxYear - Tax year the document applies to
 * @property {string} status - Processing status (uploaded, processed, rejected)
 * @property {string} notes - Additional notes
 * @property {Date} uploadedAt - Upload date
 * @property {Date} processedAt - Processing date
 */

// Database imports removed for client-side compatibility
// import { query, getById, insert, update, remove } from '../services/database';

const TABLE_NAME = 'tax_documents';

/**
 * Get a document by ID
 * @param {number} id - Document ID
 * @returns {Promise<TaxDocument>} Document object
 */
export const getDocumentById = async (id) => {
  return await getById(TABLE_NAME, id);
};

/**
 * Get all documents for a user
 * @param {number} userId - User ID
 * @returns {Promise<Array<TaxDocument>>} Array of document objects
 */
export const getDocumentsByUserId = async (userId) => {
  const sql = `SELECT * FROM ${TABLE_NAME} WHERE userId = ? ORDER BY uploadedAt DESC`;
  return await query(sql, [userId]);
};

/**
 * Get documents by type for a user
 * @param {number} userId - User ID
 * @param {string} documentType - Document type
 * @returns {Promise<Array<TaxDocument>>} Array of document objects
 */
export const getDocumentsByType = async (userId, documentType) => {
  const sql = `SELECT * FROM ${TABLE_NAME} WHERE userId = ? AND documentType = ? ORDER BY uploadedAt DESC`;
  return await query(sql, [userId, documentType]);
};

/**
 * Get documents by tax year for a user
 * @param {number} userId - User ID
 * @param {string} taxYear - Tax year
 * @returns {Promise<Array<TaxDocument>>} Array of document objects
 */
export const getDocumentsByYear = async (userId, taxYear) => {
  const sql = `SELECT * FROM ${TABLE_NAME} WHERE userId = ? AND taxYear = ? ORDER BY uploadedAt DESC`;
  return await query(sql, [userId, taxYear]);
};

/**
 * Create a new document record
 * @param {Object} documentData - Document data
 * @returns {Promise<Object>} Insert result
 */
export const createDocument = async (documentData) => {
  // Add timestamps
  const now = new Date();
  const data = {
    ...documentData,
    uploadedAt: now,
    status: documentData.status || 'uploaded'
  };
  
  return await insert(TABLE_NAME, data);
};

/**
 * Update a document
 * @param {number} id - Document ID
 * @param {Object} documentData - Document data to update
 * @returns {Promise<Object>} Update result
 */
export const updateDocument = async (id, documentData) => {
  return await update(TABLE_NAME, id, documentData);
};

/**
 * Update document status
 * @param {number} id - Document ID
 * @param {string} status - New status
 * @param {string} notes - Optional notes
 * @returns {Promise<Object>} Update result
 */
export const updateDocumentStatus = async (id, status, notes = null) => {
  const data = {
    status,
    processedAt: new Date()
  };
  
  if (notes) {
    data.notes = notes;
  }
  
  return await update(TABLE_NAME, id, data);
};

/**
 * Delete a document
 * @param {number} id - Document ID
 * @returns {Promise<Object>} Delete result
 */
export const deleteDocument = async (id) => {
  return await remove(TABLE_NAME, id);
};

export default {
  getDocumentById,
  getDocumentsByUserId,
  getDocumentsByType,
  getDocumentsByYear,
  createDocument,
  updateDocument,
  updateDocumentStatus,
  deleteDocument
};