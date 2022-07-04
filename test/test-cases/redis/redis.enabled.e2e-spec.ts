import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { mainResponse } from '../../responses';
import {
  prepareMinimalSetup,
  setupEnvVariables,
  createTestServer,
  startTestServer,
  stopTestServer,
} from '../../helpers';

jest.mock('ioredis', () => require('ioredis-mock'));

jest.mock('blizzapi', () => ({
  BlizzAPI: jest.fn().mockImplementation(() => ({
    getAccessToken: () =>
      Promise.resolve('sample_access_token_from_mocked_blizzapi'),
  })),
}));

describe('Redis enabled', () => {
  let app: NestFastifyApplication;
  let OLD_ENV: NodeJS.ProcessEnv;

  beforeAll(async () => {
    OLD_ENV = process.env;

    prepareMinimalSetup();

    setupEnvVariables([
      {
        name: 'SAS_REDIS_ENABLE',
        value: 'true',
      },
      {
        name: 'SAS_REDIS_HOST',
        value: 'redis',
      },
      {
        name: 'SAS_REDIS_PORT',
        value: '6379',
      },
      {
        name: 'SAS_REDIS_TTL_SECS',
        value: '2000',
      },
      {
        name: 'SAS_REDIS_DB',
        value: '0',
      },
      {
        name: 'SAS_REDIS_KEY_PREFIX',
        value: 'sas',
      },
      {
        name: 'SAS_REDIS_KEY_NAME',
        value: 'accesstoken',
      },
    ]);

    app = await createTestServer({
      redis: {
        enable: process.env.SAS_REDIS_ENABLE === 'true',
        host: process.env.SAS_REDIS_HOST,
        port: process.env.SAS_REDIS_PORT,
        ttlSecs: process.env.SAS_REDIS_TTL_SECS,
        db: process.env.SAS_REDIS_DB,
        keyPrefix: process.env.SAS_REDIS_KEY_PREFIX,
        keyName: process.env.SAS_REDIS_KEY_NAME,
      },
    });

    await startTestServer(app);
  });

  afterAll(async () => {
    process.env = { ...OLD_ENV };
    await stopTestServer(app);
  });

  it('/ (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.payload)).toEqual(mainResponse);
      }));
});
