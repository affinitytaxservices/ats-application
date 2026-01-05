const levels = ['debug', 'info', 'warn', 'error']

function serialize(meta) {
  try {
    return JSON.stringify(meta)
  } catch {
    return '{}'
  }
}

function log(level, message, meta = {}) {
  const ts = new Date().toISOString()
  const entry = `${ts} [${level.toUpperCase()}] ${message} ${serialize(meta)}`
  if (level === 'error') {
    console.error(entry)
  } else if (level === 'warn') {
    console.warn(entry)
  } else {
    console.log(entry)
  }
}

module.exports = {
  log,
  debug: (msg, meta) => log('debug', msg, meta),
  info: (msg, meta) => log('info', msg, meta),
  warn: (msg, meta) => log('warn', msg, meta),
  error: (msg, meta) => log('error', msg, meta),
}
