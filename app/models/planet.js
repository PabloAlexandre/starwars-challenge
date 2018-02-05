import mongoose from 'mongoose'

const Planet = new mongoose.Schema({
  name: {type: String, required: true, index: { unique: true }},
  weather: {type: String, required: true},
  terrain: {type: String, required: true}
})

export default mongoose.model('Planet', Planet)
