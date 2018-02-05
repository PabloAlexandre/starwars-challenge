import router from 'koa-router'
import controller from 'controllers/api'

const route = new router()
route.get('/', controller.home)

export default route.routes()
