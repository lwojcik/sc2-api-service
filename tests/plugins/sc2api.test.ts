import fastify from 'fastify';
import server from '../../src/index';
import getConfig from '../helper';

describe('sc2api plugin', () => {
  const fastifyServer = fastify() as any;

  beforeAll(async () => {
    fastifyServer.register(server, getConfig(false));
    await fastifyServer.ready();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('is registered', async () => {
    expect(typeof fastifyServer.sc2api).toBe("object");
  });

  it('exposes getProfile() method', async () => {
    expect(typeof fastifyServer.sc2api.getProfile).toBe("function");
  });

  it('exposes getStaticProfileData() method', async () => {
    expect(typeof fastifyServer.sc2api.getStaticProfileData).toBe("function");
  });

  it('exposes getProfileMetadata() method', async () => {
    expect(typeof fastifyServer.sc2api.getProfileMetadata).toBe("function");
  });

  it('exposes getLadderSummary() method', async () => {
    expect(typeof fastifyServer.sc2api.getLadderSummary).toBe("function");
  });

  it('exposes getLadder() method', async () => {
    expect(typeof fastifyServer.sc2api.getLadder).toBe("function");
  });

  it('exposes getLegacyProfile() method', async () => {
    expect(typeof fastifyServer.sc2api.getLegacyProfile).toBe("function");
  });

  it('exposes getLegacyLadders() method', async () => {
    expect(typeof fastifyServer.sc2api.getLegacyLadders).toBe("function");
  });

  it('exposes getLegacyLadder() method', async () => {
    expect(typeof fastifyServer.sc2api.getLegacyLadder).toBe("function");
  });

  it('exposes getLeague() method', async () => {
    expect(typeof fastifyServer.sc2api.getLeague).toBe("function");
  });

  it('exposes getGrandmasterLeaderboard() method', async () => {
    expect(typeof fastifyServer.sc2api.getGrandmasterLeaderboard).toBe("function");
  });

  it('exposes getSeason() method', async () => {
    expect(typeof fastifyServer.sc2api.getSeason).toBe("function");
  });

  it('exposes getLegacyMatchHistory() method', async () => {
    expect(typeof fastifyServer.sc2api.getLegacyMatchHistory).toBe("function");
  });

  it('exposes getLegacyAchievements() method', async () => {
    expect(typeof fastifyServer.sc2api.getLegacyAchievements).toBe("function");
  });

  it('exposes getLegacyRewards() method', async () => {
    expect(typeof fastifyServer.sc2api.getLegacyRewards).toBe("function");
  });
});