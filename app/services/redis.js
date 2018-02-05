import redis from 'redis'
const client = redis.createClient('9830', 'redis')
const app = {
  client,
  set: async (key, value, expiresIn = false) => {
    const ttl = await app.ttl(key)
    app.client.set(key, JSON.stringify(value))

    const expiry = expiresIn || ttl
    if(expiry > 0) app.client.expire(key, expiry)
  },
  get: async (key) => new Promise((resolve, reject) => {
    app.client.get(key, (err, data) => {
      if(err) reject(err)
      resolve(data ? JSON.parse(data) : null)
    })
  }),
  del: async (key) => new Promise((resolve, reject) => {
    app.client.del(key, (err, data) => {
      if(err) reject(err)
      resolve(data)
    })
  }),
  ttl: async (key) => new Promise((resolve, reject) => {
    app.client.ttl(key, (err, data) => {
      if(err) reject(err)
      resolve(data)
    })
  })
}

export default app
