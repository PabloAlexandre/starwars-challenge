import router from 'koa-router'
import controller from 'controllers/api'

const route = new router()
route.post('/save', controller.save)
route.get('/planets', controller.get)
route.get('/planets/:field', controller.search)
route.del('/planets/:field', controller.delete)
export default route.routes()
