import router from 'koa-router'
import controller from 'controllers/api'

const route = new router()
route.post('/save', controller.save)

export default route.routes()
