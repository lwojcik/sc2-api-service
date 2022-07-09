# sc2-api-service (SAS)

[![Build status](https://ci.appveyor.com/api/projects/status/5lunfkv0ot8rh3yt/branch/master?svg=true)](https://ci.appveyor.com/project/lwojcik/sc2-api-service/branch/master)
[![codecov](https://codecov.io/gh/sc2pte/sc2-api-service/branch/master/graph/badge.svg?token=sFEmFjKiRo)](https://codecov.io/gh/sc2pte/sc2-api-service)

**This is version 2 of the project and it's incompatible with previous version. If you're looking for the previous version, head to [v1 branch](https://github.com/sc2pte/sc2-api-service/tree/v1).**

REST API service retrieving and caching data objects from [StarCraft II Community APIs](https://develop.battle.net/documentation/starcraft-2/community-apis) and [StarCraft II Game Data APIs](https://develop.battle.net/documentation/starcraft-2/game-data-apis).

Under the hood it uses [NestJS](https://nestjs.com/), [Fastify](https://www.fastify.io/) and [BlizzAPI](https://www.npmjs.com/package/blizzapi).

While the primary purpose for this service is to be run inside secure API infrastructure, it can be configured to run standalone and be exposed to the public internet with modest level of security. However, be informed that it is your responsibility to keep your service as secure as possible. :)

## Setup

Docker and Docker Compose are preferred ways of setting up the project.

```bash
git clone https://github.com/sc2pte/sc2-api-service.git
cd sc2-api-service
npm install
docker-compose build
docker-compose up
```

Alternatively, you can pull a pre-built image from [GitHub Container Registry](https://github.com/orgs/sc2pte/packages/container/package/sc2-api-service):

```bash
docker pull ghcr.io/sc2pte/sc2-api-service:2
```

Pre-built images are also available on [Docker Hub](https://hub.docker.com/r/sc2pte/sc2-api-service/tags):

```bash
docker pull sc2pte/sc2-api-service:2
```

Images tagged as `1`, `2` and `latest` are built from the master branch and they are considered production-ready.

Production installation can be automated with an [Ansible role](https://github.com/sc2pte/ansible-role-sc2-api-service).

## Environment variables

Environment variable names follow the following format: `SAS_[feature name]_[feature property]`.

When in development mode, the API can load environment variables from `.env` file in root directory.

See also `.env.sample` for a dotenv template.

### App setup

General app setup necessary to launch the service.

- `NODE_ENV` - Node environment (`'development'` or `'production'`, default: `development`)
- `SAS_NODE_HOST` - hostname (default: `'0.0.0.0'`)
- `SAS_NODE_PORT` - port (default: `'3000'`)
- `SAS_APP_CORS_ENABLE` - enable CORS (default: `false`)
- `SAS_APP_CORS_ORIGIN` - allowed CORS origin if CORS is enabled, optional

### Battle.net and bnet-auth-service setup

This part of setup is mandatory. To obtain Battle.net API credentials log in to [Blizzard Battle.net Developer Portal](https://develop.battle.net/access/).and [create a new client](https://develop.battle.net/access/clients/create).

- `SAS_BATTLENET_REGION` - Battle.net API region to authorize against (`'us'`, `'eu'`, `'kr'` or `'ch'`, required). API credentials and generated access tokens are valid across all regions.
- `SAS_BATTLENET_CLIENT_ID` - Battle.net API application key
- `SAS_BATTLENET_CLIENT_SECRET` - Battle.net API application secret
- `SAS_BAS_URL` - URL to [bnet-auth-service](https://github.com/sc2pte/bnet-auth-service) instance used for rotating OAuth access tokens

### Redis setup

This setup is optional. Enabling Redis allows for caching access tokens in order to minimize the number of requests to Battle.net API.

- `SAS_REDIS_ENABLE` - enable Redis caching (default `'true'`). If you pass `false`, configuring other Redis-related environment variables is not necessary.
- `SAS_REDIS_HOST` - Redis hostname (default: `'redis'`)
- `SAS_REDIS_PORT` - Redis port (default: `'6379'`)
- `SAS_REDIS_PASSWORD` - Redis password (optional)
- `SAS_REDIS_TTL_SECS` - cache TTL in seconds (Time To Live, time for which objects will be cached). Access tokens issued by Battle.net API are valid for 24 hours, so it is not advisable to set TTL longer than 86400 seconds (default: `2000`).
- `SAS_REDIS_DB` - Redis database index to use
- `SAS_REDIS_KEY_PREFIX` - key prefix used to identify keys related to sc2-api-service (default: `'bas'`)
- `SAS_REDIS_KEY_NAME` - name used to identify the key under which cached access token is stored (default: `accesstoken`)

### Throttling / rate limiting

Rate limiting is always on. To effectively disable it, set high values for TTL and limit. Default limits are significantly below limits of Battle.net API (36,000 requests per hour / 100 requests per second) and they shouldn't trigger 429 Too Many Requests errors.

- `SAS_THROTTLE_TTL_SECS` - how long throttling is effective per single client (default: 60 seconds)
- `SAS_THROTTLE_LIMIT`- limit of requests per client within alloted TTL (default: 300)

When the limit is reached, the service will return 429 error code with the following body:

```json
{
  "statusCode": 429,
  "message": "ThrottlerException: Too Many Requests"
}
```

### Authorization

sc2-api-service supports simplified authorization flow with JWT tokens. If you enable it, each request must contain a JWT token containing pre-configured username (`{ 'username': 'some-user' }`), signed by a pre-configured secret, passed inside a request header:

```js
{
  Authorization: 'Bearer <JWT Token here>';
}
```

- `SAS_AUTH_ENABLE` - whether authorization should be enabled (default: `false`)
- `SAS_AUTH_USERNAME` - username passed as JWT payload
- `SAS_AUTH_JWT_SECRET` - secret that should be used to sign and verify JWT token

If the incoming request doesn't contain correct JWT token, all endpoints will return 401 error:

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### HTTPS support

Service can run in HTTPS mode using provided key and certificate.

- `SAS_HTTPS_ENABLE` - whether HTTPS should be supported (default: `false`)
- `SAS_HTTPS_KEY_PATH` - path to HTTPS signing key (example: `certs/localhost.key`)
- `SAS_HTTPS_CERT_PATH` - path to HTTPS certificate (example: `certs/localhost.pem`)

### Caching mechanism

If `SAS_REDIS_ENABLE` is set to `false`, this endpoint always queries Battle.net API for a new access token.

If `SAS_REDIS_ENABLE` is set to `true`, each access token obtained from Battle.net API is cached in Redis store.

If wrong credentials are used, the service will return 200 OK response with the following body:

```json
{
  "error": "BnetApiError",
  "statusCode": 401,
  "message": "Request failed with status code 401",
  "id": "6bc-043d-4d58-b28b-72a6605dcf78"
}
```

`id` is the request identifier than can be used to find the error in service logs.

## Available endpoints

All endpoints return data in a following format:

```json
{
  "statusCode": 200,
  "data": {
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

### `GET /profile/laddersummary/:regionId/:realmId/:profileId`

Returns a ladder summary for an individual SC2 profile.

### `GET /profile/ladder/:regionId/:realmId/:profileId/:ladderId`

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

## Swagger

Swagger is available when `NODE_ENV` is set to `development` at `http://service.url.here/api`. When using the service locally, the URL is most likely `http://localhost:3000/api`.

## Contributions

`sc2-api-service` is mostly a complete project and no further features are planned.

The type of contributions that are most welcome:

- bug reports and fixes of any kind
- documentation improvements
- suggestions of additional properties returned by any of the existing endpoints
- error responses that weren't explicitly documented

Before contributing be sure to read [Code of Conduct](https://github.com/sc2pte/sc2-api-service/blob/master/CODE_OF_CONDUCT.md).

## License

Code is available under MIT license. See [LICENSE](https://raw.githubusercontent.com/sc2pte/sc2-api-service/master/LICENSE) for more information.
