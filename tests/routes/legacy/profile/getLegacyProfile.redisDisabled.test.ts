import fastify from 'fastify';
import server from '../../../../src/index';
import getConfig from '../../../helper';

describe('/legacy/profile/:regionId/:realmId/:profileId (Redis disabled)', () => {
  const fastifyServer = fastify() as any;
  const url = '/legacy/profile/1/1/1';

  beforeAll(() => fastifyServer.register(server, getConfig(false)));

  afterAll(() => fastifyServer.close());

  it('returns 200', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url });
    expect(res.statusCode).toBe(200);
  });

  it('returns correct response', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url });
    expect(res.payload).toMatchSnapshot();
  });
});
