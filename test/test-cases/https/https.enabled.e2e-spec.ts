import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { mainResponseWithoutCaching, statusProperties } from '../../responses';
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

describe('HTTPS enabled', () => {
  let app: NestFastifyApplication;
  let OLD_ENV;

  beforeAll(async () => {
    OLD_ENV = process.env;

    prepareMinimalSetup();

    setupEnvVariables([
      {
        name: 'SAS_HTTPS_ENABLE',
        value: 'true',
      },
      {
        name: 'SAS_HTTPS_KEY',
        value: 'test/certs/test.key',
      },
      {
        name: 'SAS_HTTPS_CERT',
        value: 'test/certs/test.pem',
      },
    ]);

    app = await createTestServer({
      https: {
        enable: process.env.SAS_HTTPS_ENABLE === 'true',
        key: process.env.SAS_HTTPS_KEY,
        cert: process.env.SAS_HTTPS_CERT,
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
        expect(JSON.parse(result.payload)).toEqual(mainResponseWithoutCaching);
      }));

  it('/status (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/status',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);

        statusProperties.forEach((property) => {
          expect(JSON.parse(result.payload)).toHaveProperty(property);
        });
      }));
});
