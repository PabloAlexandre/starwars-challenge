import router from 'koa-router'
import controller from 'controllers/api'

const route = new router()
route.post('/save', controller.save)
route.get('/planets', controller.get)
route.get('/planets/search/:field', controller.search)
export default route.routes()
