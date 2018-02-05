import { validate } from 'app/helpers'
import mongoose from 'mongoose'
import Planet from 'models/planet'
import planets from 'services/swapi/planets'

const formatPlanets = async (allPlanets) => {
  const indexedPlanets = await planets.get()

  return allPlanets.map((planet) => {
    const {_id: id, name, weather, terrain} = planet
    const p = indexedPlanets.find((v) => planet.name === v.name)
    const movies = p ? p.films.length : 0

    return {
      id, name, weather, terrain, movies
    }
  })
}

export default {
  search: async (ctx) => {
    const { field } = ctx.params
    const findBy = !mongoose.Types.ObjectId.isValid(field) ? {
      name: field
    } : {
      _id: field
    }

    const savedPlanets = await Planet.find(findBy)
    ctx.body = await formatPlanets(savedPlanets)
  },
  get: async (ctx) => {
    const savedPlanets = await Planet.find({})
    ctx.body = await formatPlanets(savedPlanets)
  },
  save: async (ctx) => {
    const {request: {body}} = ctx
    const properties = [
      {field: 'planet', message: 'You need to pass planet field'},
      {field: 'weather', message: 'You need to pass weather field'},
      {field: 'terrain', message: 'You need to pass terrain field'}
    ]

    const validation = validate(body, properties, false)
    if(!validation.isValid) ctx.throw(400, validation.errors.join('/n'))

    const { planet: name, weather, terrain } = body
    const planet = new Planet({name, weather, terrain})

    try {
      await planet.save()
    } catch(err) {
      return ctx.throw(409, 'This Planet Already Exists')
    }

    ctx.body = {planet: name, weather, terrain, id: planet._id}
  }
}
