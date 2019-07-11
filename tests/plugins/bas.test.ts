import fastify from 'fastify';
import server from '../../src/index';
import getConfig from '../helper';

describe('BAS plugin', () => {
  const fastifyServer = fastify() as any;

  beforeAll(async () => {
    fastifyServer.register(server, getConfig(false));
    await fastifyServer.ready();
  });

  it('is registered', async () => {
    expect(typeof fastifyServer.bas).toBe("object");
  });

  it('exposes getAccessToken() method', async () => {
    expect(typeof fastifyServer.bas.getAccessToken).toBe("function");
  });

  it('exposes refreshAccessToken() method', async () => {
    expect(typeof fastifyServer.bas.refreshAccessToken).toBe("function");
  });
});