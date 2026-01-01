const express = require('express')
const { info, error } = require('../logger')

const router = express.Router()

let store = []
const maxStore = 500

router.post('/', (req, res) => {
  const entry = {
    receivedAt: new Date().toISOString(),
    ...req.body,
  }
  store.push(entry)
  if (store.length > maxStore) {
    store = store.slice(-maxStore)
  }
  info('client_error', { source: req.body?.source, severity: req.body?.severity })
  res.json({ success: true })
})

router.get('/', (req, res) => {
  res.json({ data: store.slice(-50) })
})

router.delete('/', (req, res) => {
  store = []
  res.json({ success: true })
})

module.exports = router
