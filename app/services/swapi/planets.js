import axios from 'axios'
import {base_url} from './path'
import redis from 'services/redis'

const app = {
  get: async () => {
    //20 DAYS CACHE TO CHECK IF A NEW PLANET WAS ADDED WHEN NEW MOVIES COME OUT
    const cache = await redis.get(`planets`, 60 * 60 * 24 * 20)
    if(cache) return cache

    const firstPage = await axios.get(`${base_url}planets/`)
    const missing = Math.ceil((firstPage.data.count - firstPage.data.results.length) / firstPage.data.results.length)

    let requests = []
    for(let i = 2; i < missing + 2; i++){
      requests = [...requests, axios.get(`${base_url}planets?page=${i}`)]
    }

    const anotherPages = await axios.all(requests)
    const allPages = [firstPage, ...anotherPages]
    const planets = allPages.reduce((planets, v) => [...planets, ...v.data.results], [])
    await redis.set(`planets`, planets)
    return planets
  },
  appearanceInMovies: async (planetName) => {
    const planets = await app.get()
    const planet = planets.find((v) => planetName === v.name)
    return planet ? planet.films.length : 0
  }
}

export default app
