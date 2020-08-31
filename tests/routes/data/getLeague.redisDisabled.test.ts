import fastify from 'fastify';
import server from '../../../src/index';
import getConfig from '../../helper';

describe('/data/league/:seasonId/:queueId/:teamType/:leagueId (Redis disabled)', () => {
  const fastifyServer = fastify() as any;
  const url = '/data/league/40/201/0/6';

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
