const { info } = require('../logger')

function requestLogger(req, res, next) {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    info('http_request', {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration_ms: duration,
      ip: req.ip,
    })
  })
  next()
}

module.exports = requestLogger
