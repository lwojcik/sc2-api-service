import fastify from 'fastify';
import server from '../../../../src/index';
import getConfig from '../../../helper';

describe('/ladder/grandmaster/:regionId (Redis disabled)', () => {
  const fastifyServer = fastify() as any;
  const url = '/ladder/grandmaster/1';

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

  it('returns correct response when refresh is set to true', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url, query: { refresh: 'true' } });
    expect(res.statusCode).toBe(200);
    expect(res.payload).toMatchSnapshot();
  });
});