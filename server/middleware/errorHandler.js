const { error } = require('../logger')

function errorHandler(err, _req, res, _next) {
  const status = err.status || 500
  error('api_error', { status, message: err.message })
  res.status(status).json({ error: err.message || 'Internal Server Error' })
}

module.exports = errorHandler
