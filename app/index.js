import koa from 'koa'
import * as routes from 'routes/'

const app = new koa()
Object.keys(routes).forEach(key => {
  app.use(routes[key])
})

const port = process.env.ENV || 3000
app.listen(port)
console.log(`Listening on ${port}`)
