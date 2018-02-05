# Starwars Planets API
An Star Wars API in REST to register and list some planets of all movies and universe

## Getting started
To run this app, you have to install previously [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/).

After install both, run this command in root:

```
docker-compose up -d
```

After that, this API will be running on port 3000

## Endpoints

You can access a Postman collection here. The environment variable `domain` is `localhost:3000`

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5f89fc826929ef2aa0d9)


### Creating a planet
To create a planet, you can call `/save`. The method of this endpoint is `POST`. You need to pass `Content-Type` as `application/json` and this parameters:
```
{
  "planet": "PlanetName",
  "weather": "PlanetWeather",
  "terrain": "PlanetTerrain"
}
```

If planet already exists, you will receive an error with `statusCode=409`.

### Getting a list of planets
To get all planets, you can call `/planets`. The method of this endpoint is `GET`. You will receive an object like that:

```
[{
  "id": "PlanetId",
  "name": "PlanetName",
  "weather": "PlanetWeather",
  "terrain": "Terrain",
  "movie": "MovieAppearance"
}, {
  "id": "AnotherPlanetId",
  "name": "AnotherPlanetName",
  "weather": "AnotherPlanetWeather",
  "terrain": "AnotherTerrain",
  "movie": "MovieAppearance"
}]
```

### Get Planet By Name or Id
To get a planet by `name` or `id`, you can call `/planets/:field`. The method of this endpoint is `GET`. The parameter `field` can be a planet id or a planet name. You will receive an object like that:

```
[{
  "id": "PlanetId",
  "name": "PlanetName",
  "weather": "PlanetWeather",
  "terrain": "Terrain",
  "movie": "MovieAppearance"
}]
```

### Removing a Planet
To remove a saved planet, you can call `/planets/:field`. The method of this endpoint is `DELETE`. The parameter `field` can be a planet id or a planet name. You will receive an string as confirmation with `statusCode=200`:

```
Deleted Successfully
```
