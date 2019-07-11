import fastify from 'fastify';
import fastifyRedis from 'fastify-redis-mock';
import server from '../../../../src/index';
import getConfig from '../../../helper';

describe('/legacy/matches/:regionId/:realmId/:profileId (Redis enabled)', () => {
  const fastifyServer = fastify() as any;
  const url = '/legacy/matches/1/1/1';
  const cacheSegment = 'legacyMatchHistory-1-1-1';
  const expectedTTL = getConfig(true).redis.ttl.legacy.matchHistory;
 
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
    expect(ttl).toEqual(expectedTTL);
  });
});