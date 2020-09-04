(process.env.NODE_ENV !== 'production') && require('dotenv').config();
const fastify = require('fastify');
// const fp = require('fastify-plugin');
const fastifyBlipp = require('fastify-blipp');
const fastifyRedis = require('fastify-redis');
const fastifyEnv = require('fastify-env');
const server = require('../dist/index');

const envSchema = {
  type: 'object',
  required: [
    'NODE_ENV',
    'SAS_BAS_URL',
    'SAS_BAS_STATUS_ENDPOINT',
    'SAS_BAS_ACCESS_TOKEN_ENDPOINT',
    'SAS_BAS_ACCESS_TOKEN_FRESH_ENDPOINT',
    'SAS_REDIS_ENABLE',
    'SAS_REDIS_HOST',
    'SAS_REDIS_PORT',
    'SAS_REDIS_PASSWORD',
    'SAS_REDIS_DB',
    'SAS_REDIS_STATIC_TTL_SECS',
    'SAS_REDIS_METADATA_TTL_SECS',
    'SAS_REDIS_PROFILE_TTL_SECS',
    'SAS_REDIS_LADDER_SUMMARY_TTL_SECS',
    'SAS_REDIS_LADDER_TTL_SECS',
    'SAS_REDIS_GRANDMASTER_LEADERBOARD_TTL_SECS',
    'SAS_REDIS_SEASON_TTL_SECS',
    'SAS_REDIS_LEGACY_PROFILE_TTL_SECS',
    'SAS_REDIS_LEGACY_LADDERS_TTL_SECS',
    'SAS_REDIS_LEGACY_MATCH_HISTORY_TTL_SECS',
    'SAS_REDIS_LEGACY_LADDER_TTL_SECS',
    'SAS_REDIS_LEGACY_ACHIEVEMENTS_TTL_SECS',
    'SAS_REDIS_LEGACY_REWARDS_TTL_SECS',
    'SAS_BATTLENET_REGION',
  ],
  properties: {
    NODE_ENV: {
      type: 'string',
      default: 'development',
    },
    SAS_BAS_URL: {
      type: 'string',
      default: 'http://localhost:8082',
    },
    SAS_BAS_STATUS_ENDPOINT: {
      type: 'string',
      default: 'status',
    },
    SAS_BAS_ACCESS_TOKEN_ENDPOINT: {
      type: 'string',
      default: 'accessToken/get',
    },
    SAS_BAS_ACCESS_TOKEN_FRESH_ENDPOINT: {
      type: 'string',
      default: 'accessToken/get?refresh=true',
    },
    SAS_REDIS_ENABLE: {
      type: 'string',
      default: 'true',
    },
    SAS_REDIS_HOST: {
      type: 'string',
      default: '127.0.0.1',
    },
    SAS_REDIS_PORT: {
      type: 'string',
      default: '6379',
    },
    SAS_REDIS_PASSWORD: {
      type: 'string',
      default: '',
    },
    SAS_REDIS_STATIC_TTL_SECS: {
      type: 'string',
      default: '2000',
    },
    SAS_REDIS_METADATA_TTL_SECS: {
      type: 'string',
      default: '2000',
    },
    SAS_REDIS_PROFILE_TTL_SECS: {
      type: 'string',
      default: '2000',
    },
    SAS_REDIS_LADDER_SUMMARY_TTL_SECS: {
      type: 'string',
      default: '2000',
    },
    SAS_REDIS_LADDER_TTL_SECS: {
      type: 'string',
      default: '2000',
    },
    SAS_REDIS_GRANDMASTER_LEADERBOARD_TTL_SECS: {
      type: 'string',
      default: '2000',
    },
    SAS_REDIS_SEASON_TTL_SECS: {
      type: 'string',
      default: '2000',
    },
    SAS_REDIS_LEGACY_PROFILE_TTL_SECS: {
      type: 'string',
      default: '2000',
    },
    SAS_REDIS_LEGACY_LADDERS_TTL_SECS: {
      type: 'string',
      default: '2000',
    },
    SAS_REDIS_LEGACY_MATCH_HISTORY_TTL_SECS: {
      type: 'string',
      default: '2000',
    },
    SAS_REDIS_LEGACY_LADDER_TTL_SECS: {
      type: 'string',
      default: '2000',
    },
    SAS_REDIS_LEGACY_ACHIEVEMENTS_TTL_SECS: {
      type: 'string',
      default: '2000',
    },
    SAS_REDIS_LEGACY_REWARDS_TTL_SECS: {
      type: 'string',
      default: '2000',
    },
    SAS_BATTLENET_REGION: {
      type: 'string',
      default: '2000',
    },
    SAS_REDIS_DB: {
      type: 'string',
      default: '0',
    },
    SAS_BATTLENET_REGION: {
      type: 'string',
    },
  }
}

const opts = {
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.SAS_NODE_PORT || '8081',
  },
  bas: {
    url: process.env.SAS_BAS_URL || 'http://localhost:8082',
    statusEndpoint: process.env.SAS_BAS_STATUS_ENDPOINT || 'status',
    accessTokenEndpoint: process.env.SAS_BAS_ACCESS_TOKEN_ENDPOINT || 'accessToken/get',
    accessTokenRefreshEndpoint: process.env.SAS_BAS_ACCESS_TOKEN_FRESH_ENDPOINT || 'accessToken/get?refresh=true',
  },
  redis: {
    enable: process.env.SAS_REDIS_ENABLE === 'true' || false,
    host: process.env.SAS_REDIS_HOST || '127.0.0.1',
    port: process.env.SAS_REDIS_PORT || '6379',
    password: process.env.SAS_REDIS_PASSWORD || '',
    db: process.env.SAS_REDIS_DB || '0',
    replyCachePeriod: process.env.SAS_REDIS_CACHE_PERIOD || 1000 * 60 * 10,
    cacheSegment: process.env.SAS_REDIS_CACHE_SEGMENT || 'bas',
    ttl: {
      static: process.env.SAS_REDIS_STATIC_TTL_SECS || '2000',
      metadata: process.env.SAS_REDIS_METADATA_TTL_SECS || '2000',
      profile: process.env.SAS_REDIS_PROFILE_TTL_SECS || '2000',
      ladderSummary: process.env.SAS_REDIS_LADDER_SUMMARY_TTL_SECS || '2000',
      ladder: process.env.SAS_REDIS_LADDER_TTL_SECS || '2000',
      grandmaster: process.env.SAS_REDIS_GRANDMASTER_LEADERBOARD_TTL_SECS || '2000',
      season: process.env.SAS_REDIS_SEASON_TTL_SECS || '2000',
      league: process.env.SAS_REDIS_LEAGUE_TTL_SECS || '2000',
      legacy: {
        profile: process.env.SAS_REDIS_LEGACY_PROFILE_TTL_SECS || '2000',
        ladders: process.env.SAS_REDIS_LEGACY_LADDERS_TTL_SECS || '2000',
        matchHistory: process.env.SAS_REDIS_LEGACY_MATCH_HISTORY_TTL_SECS || '2000',
        ladder: process.env.SAS_REDIS_LEGACY_LADDER_TTL_SECS|| '2000',
        achievements: process.env.SAS_REDIS_LEGACY_ACHIEVEMENTS_TTL_SECS || '2000',
        rewards: process.env.SAS_REDIS_LEGACY_REWARDS_TTL_SECS || '2000',
      },
    },
  },
  bnet: {
    region: process.env.SAS_BATTLENET_REGION,
  }
}

const fastifyInstance = fastify({
  logger: process.env.NODE_ENV === 'development'
});

fastifyInstance.register(fastifyEnv, {
  schema: envSchema,
  dotenv: {
      path: `${__dirname}/.env`,
      debug: process.env.NODE_ENV === 'development'
  },
});

if (process.env.SAS_REDIS_ENABLE === 'true') {
  fastifyInstance.register(fastifyRedis, {
    host: opts.redis.host,
    port: opts.redis.port,
    password: opts.redis.password,
    enableReadyCheck: true,
    dropBufferSupport: false,
  });
}

fastifyInstance.register(server, opts);
fastifyInstance.register(fastifyBlipp);

const start = () => fastifyInstance.listen(process.env.SAS_NODE_PORT, (err) => {
  if (err) throw err;
  fastifyInstance.blipp();
  fastifyInstance.log.info(`Redis cache enabled: ${!!opts.redis.enable}`);
});

start();