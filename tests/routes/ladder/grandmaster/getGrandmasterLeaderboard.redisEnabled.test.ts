import fastify from 'fastify';
import fastifyRedis from 'fastify-redis-mock';
import server from '../../../../src/index';
import getConfig from '../../../helper';

describe('/ladder/grandmaster/:regionId (Redis enabled)', () => {
  const fastifyServer = fastify() as any;
  const url = '/ladder/grandmaster/1';
  const cacheSegment = 'grandmaster-1';

  beforeAll(async () => {
    fastifyServer.register(fastifyRedis, {
      host: '127.0.0.1',
      port: '6379',
      password: '',
      enableReadyCheck: true,
      dropBufferSupport: false,
    });
    fastifyServer.register(server, getConfig(true));
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

  it('response is cached correctly', async () => {
    await fastifyServer.inject({ method: 'GET', url });
    const cachedResponse = await fastifyServer.redis.get(cacheSegment);
    expect(cachedResponse).toMatchSnapshot();
  });

  it('cached response has correct TTL', async () => {
    await fastifyServer.inject({ method: 'GET', url });
    const ttl = await fastifyServer.redis.ttl(cacheSegment);
    expect(ttl.toString()).toMatch(getConfig(true).redis.ttl.grandmaster.toString());
  });
});