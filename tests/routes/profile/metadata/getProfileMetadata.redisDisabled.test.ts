import fastify from 'fastify';
import server from '../../../../src/index';
import getConfig from '../../../helper';

describe('/profile/metadata/:regionId/:realmId/:profileId (Redis disabled)', () => {
  const fastifyServer = fastify() as any;
  const url = '/profile/metadata/1/1/1';

  beforeAll(async () => {
    await fastifyServer.register(server, getConfig(false));
  });

  afterEach(() => {
    fastifyServer.close();
  });

  it('returns 200', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url });
    expect(res.statusCode).toBe(200);
  });

  it('returns correct response', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url });
    expect(res.payload).toMatchSnapshot();
  });
});