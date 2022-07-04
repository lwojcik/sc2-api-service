import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { mainResponse, statusProperties } from '../../responses';
import {
  prepareMinimalSetup,
  setupEnvVariables,
  createTestServer,
  startTestServer,
  stopTestServer,
} from '../../helpers';

jest.mock('ioredis', () => require('ioredis-mock'));

jest.mock(
  'blizzapi',
  jest.fn().mockImplementation(() => ({
    BlizzAPI: function BlizzAPI() {
      return {
        getAccessToken: () => ({
          error: 'BnetApiError',
          message: 'Request failed with status code 401',
          statusCode: 401,
        }),
      };
    },
  }))
);

describe('Battle.net API (incorrect config)', () => {
  let app: NestFastifyApplication;
  let OLD_ENV: NodeJS.ProcessEnv;

  beforeAll(async () => {
    OLD_ENV = process.env;

    prepareMinimalSetup();

    setupEnvVariables([
      {
        name: 'SAS_BATTLENET_REGION',
        value: undefined,
      },
      {
        name: 'SAS_BATTLENET_CLIENT_ID',
        value: undefined,
      },
      {
        name: 'SAS_BATTLENET_CLIENT_SECRET',
        value: undefined,
      },
    ]);

    app = await createTestServer({
      battlenet: {
        region: process.env.SAS_BATTLENET_REGION,
        clientId: process.env.SAS_BATTLENET_CLIENT_ID,
        clientSecret: process.env.SAS_BATTLENET_CLIENT_SECRET,
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
