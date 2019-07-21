# sc2-api-service
[![Travis CI Build Status](https://travis-ci.org/lukemnet/sc2-api-service.svg?branch=master)](https://travis-ci.org/lukemnet/sc2-api-service)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/o13le854ajki48kt?svg=true)](https://ci.appveyor.com/project/lwojcik/sc2-api-service)
[![Maintainability](https://api.codeclimate.com/v1/badges/f362d1d1b96e39f1b2b3/maintainability)](https://codeclimate.com/github/lukemnet/sc2-api-service/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f362d1d1b96e39f1b2b3/test_coverage)](https://codeclimate.com/github/lukemnet/sc2-api-service/test_coverage)
[![Greenkeeper badge](https://badges.greenkeeper.io/lukemnet/sc2-api-service.svg)](https://greenkeeper.io/)

REST API service retrieving and caching data objects from [StarCraft II Community API](https://develop.battle.net/documentation/api-reference/starcraft-2-community-api/).

All API endpoints except Player endpoint from Account API (`/sc2/player/:accountId`) are supported.

## Important notes

* This service is not meant to be exposed to the internet as-is. It lacks essential security features such as authentication. It is designed to run locally or as a part of a bigger, more secure API architecture.
* The service assumes Battle.net always returns complete and correct data. However, StarCraft II API is notorious for [returning incomplete / outdated data](https://us.battle.net/forums/en/bnet/topic/20771177224). You are responsible for validating data objects on your end.
* You are responsible for keeping endpoints in sync if you use Redis cache (use `refresh=true` to force cache refresh).

## Requirements

* Node.js (LTS preferred)
* Redis server - recommended, but not required
* [Bnet-auth-service](https://github.com/lukemnet/bnet-auth-service) instance or compatible service for handling OAuth authentication

## Setup

The following environment variables must be set up:

* `NODE_ENV` - Node environment (`'development'` or `'production'`, default: `development`)
* `SAS_NODE_HOST` - hostname (default: `'localhost'`)
* `SAS_NODE_PORT` - port (default: `'8080'`)
* `SAS_REDIS_ENABLE` - enable Redis caching (default `'true'`)
* `SAS_REDIS_HOST` - Redis hostname (default: `'localhost'`)
* `SAS_REDIS_PORT` - Redis port (default: `'6379'`)
* `SAS_REDIS_PASSWORD` - Redis password (optional)
* `SAS_REDIS_DB` - Redis database index to use
* `SAS_REDIS_[endpoint name]_TTL` - all keys matching that pattern refer to cache TTL of different endpoints (Time To Live, time for which objects will be cached). See `.env.sample` for a complete example.

To obtain Battle.net API credentials (key and secret) visit [Blizzard Battle.net Developer Portal](https://develop.battle.net/access/).

See also `.env.sample` for a dotenv template.

When in development mode, the API can load environment variables from `.env` file in root directory.

## Build and install

Install and configure [`bnet-auth-service`](https://github.com/lukemnet/bnet-auth-service) first. `sc2-api-service` checks if `bnet-auth-service` is running on startup.

```
git clone https://github.com/lukemnet/sc2-api-service.git
cd sc2-api-service
npm install
npm run build
```

## Start server

```
npm start
```

If you are running the service locally, you can also use `npm run dev` to start both `bnet-auth-service` and `sc2-api-service` with a single command.

## Available endpoints

All endpoints return data in a following format:

```
{
  status:200,
  data: {
    // data from Battle.net API
  }
}
```

Adding `refresh=true` to endpoint URL (example: `/profile/static/?refresh=true`) forces the service to query and cache new data from Battle.net API regardless of cache state.

### `GET /status`

Returns `{ status: 200, message: "ok" }` if the service is up and running.

### `GET /profile/static/:regionId`

Returns all static SC2 profile data (achievements, categories, criteria, and rewards).

### `GET /profile/metadata/:regionId/:realmId/:profileId`

Returns metadata for an individual's profile.

### `GET /profile/profile/:regionId/:realmId/:profileId`

Returns data about an individual SC2 profile.

### `GET /profile/ladderSummary/:regionId/:realmId/:profileId`

Returns a ladder summary for an individual SC2 profile.

### `GET /profile/ladderSummary/:regionId/:realmId/:profileId/:ladderId`

Returns data about an individual profile's ladder.

### `GET /ladder/grandmaster/:regionId`

Returns ladder data for the current season's grandmaster leaderboard.

### `GET /data/league/:seasonId/:queueId/:teamType/:leagueId`

Returns data for the specified season, queue, team, and league.

### `GET /legacy/profile/:regionId/:realmId/:profileId`

Retrieves data about an individual SC2 profile (legacy).

### `GET /legacy/ladders/:regionId/:realmId/:profileId`

Retrieves data about an individual SC2 profile's ladders (legacy).

### `GET /legacy/matches/:regionId/:realmId/:profileId`

Returns data about an individual SC2 profile's match history (legacy).

### `GET /legacy/ladder/:ladderId`

Returns data about an individual SC2 ladder (legacy).

### `GET /legacy/achievements/:ladderId`

Returns data about the achievements available in SC2 (legacy).

### `GET /legacy/rewards/:ladderId`

Returns data about the rewards available in SC2 (legacy).

## License

Code is available under MIT license. See [LICENSE](https://raw.githubusercontent.com/lukemnet/sc2-api-service/master/LICENSE) for more information.
