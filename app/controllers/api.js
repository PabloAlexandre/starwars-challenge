import { validate } from 'app/helpers'
import Planet from 'models/planet'

export default {
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
