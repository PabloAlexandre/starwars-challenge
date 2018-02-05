import mongoose from 'mongoose'

const envs = {
  'test': 'test',
  'default': 'n1insight'
}

const db = envs[process.env.ENV || 'default']
mongoose.Promise = Promise
const client = mongoose.connect(`mongodb://mongo:36087/${db}`)
export default {
  close: () => client.close(),
  client
}
