import koa from 'koa'
import body from 'koa-body'
import * as routes from 'routes/'
import * as services from 'services/'

const app = new koa()
app.use(body())
Object.keys(routes).forEach((key) => {
  app.use(routes[key])
})

const port = process.env.ENV || 3000
app.listen(port)
console.log(`Listening on ${port}`)
