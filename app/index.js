import koa from 'koa'
const app = new koa()
app.use(ctx => {
  ctx.body = 'Hello'
})

const port = process.env.ENV || 3000
app.listen(port)
console.log(`Listening on ${port}`)
