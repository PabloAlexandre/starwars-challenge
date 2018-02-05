import mongoose from 'mongoose'

const envs = {
  'test': 'test',
  'default': 'n1insight'
}

const address = process.env.MONGO_ADDR || 'mongo'
const port = process.env.MONGO_PORT || '36087'
const db = envs[process.env.ENV || 'default']
mongoose.Promise = Promise

const client = mongoose.connect(`mongodb://${address}:${port}/${db}`)
export default {
  close: () => client.close(),
  client
}
