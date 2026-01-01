class Cache {
  constructor(ttlMs = 60000, max = 100) {
    this.ttl = ttlMs
    this.max = max
    this.store = new Map()
  }
  set(key, value) {
    const now = Date.now()
    this.store.set(key, { value, expires: now + this.ttl })
    if (this.store.size > this.max) {
      const firstKey = this.store.keys().next().value
      this.store.delete(firstKey)
    }
  }
  get(key) {
    const entry = this.store.get(key)
    if (!entry) return null
    if (Date.now() > entry.expires) {
      this.store.delete(key)
      return null
    }
    return entry.value
  }
}

module.exports = Cache
