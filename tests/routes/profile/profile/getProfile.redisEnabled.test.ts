import fastify from 'fastify';
import fastifyRedis from 'fastify-redis-mock';
import server from '../../../../src/index';
import getConfig from '../../../helper';

describe('/profile/profile/:regionId/:realmId/:profileId (Redis enabled)', () => {
  const fastifyServer = fastify() as any;
  const url = '/profile/profile/1/1/1';
  const cacheSegment = 'profile-1-1-1';
  const expectedTTL = getConfig(true).redis.ttl.profile;
 
  beforeAll(() => {
    fastifyServer.register(fastifyRedis, {
      host: '127.0.0.1',
      port: '6379',
      password: '',
      enableReadyCheck: true,
      dropBufferSupport: false,
    });
    fastifyServer.register(server, getConfig(true));
  });

  afterAll(() => fastifyServer.close());

  it('returns 200', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url });
    expect(res.statusCode).toBe(200);
  });

  it('returns correct response', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url });
    expect(res.payload).toMatchSnapshot();
  });

  it('response is cached correctly', async () => {
    const cachedResponse = await fastifyServer.redis.get(cacheSegment);
    expect(cachedResponse).toMatchSnapshot();
  });

  it('cached response has correct TTL', async () => {
    const ttl = await fastifyServer.redis.ttl(cacheSegment);
    expect(ttl).toEqual(expectedTTL);
  });

  it('returns correct response when refresh is set to true', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url, query: { refresh: 'true' } });
    expect(res.statusCode).toBe(200);
    expect(res.payload).toMatchSnapshot();
  });
});
