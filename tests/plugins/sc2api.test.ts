import fastify from "fastify";
import server from "../../src/index";
import getConfig from "../helper";

describe("sc2api plugin", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fastifyServer = fastify() as any;

  beforeAll(async () => {
    fastifyServer.register(server, getConfig(false));
    await fastifyServer.ready();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("is registered", () => {
    expect(typeof fastifyServer.sc2api).toBe("object");
  });

  it("exposes getProfile() method", () => {
    expect(typeof fastifyServer.sc2api.getProfile).toBe("function");
  });

  it("exposes getStaticProfileData() method", () => {
    expect(typeof fastifyServer.sc2api.getStaticProfileData).toBe("function");
  });

  it("exposes getProfileMetadata() method", () => {
    expect(typeof fastifyServer.sc2api.getProfileMetadata).toBe("function");
  });

  it("exposes getLadderSummary() method", () => {
    expect(typeof fastifyServer.sc2api.getLadderSummary).toBe("function");
  });

  it("exposes getLadder() method", () => {
    expect(typeof fastifyServer.sc2api.getLadder).toBe("function");
  });

  it("exposes getLegacyProfile() method", () => {
    expect(typeof fastifyServer.sc2api.getLegacyProfile).toBe("function");
  });

  it("exposes getLegacyLadders() method", () => {
    expect(typeof fastifyServer.sc2api.getLegacyLadders).toBe("function");
  });

  it("exposes getLegacyLadder() method", () => {
    expect(typeof fastifyServer.sc2api.getLegacyLadder).toBe("function");
  });

  it("exposes getLeague() method", () => {
    expect(typeof fastifyServer.sc2api.getLeague).toBe("function");
  });

  it("exposes getGrandmasterLeaderboard() method", () => {
    expect(typeof fastifyServer.sc2api.getGrandmasterLeaderboard).toBe(
      "function"
    );
  });

  it("exposes getSeason() method", () => {
    expect(typeof fastifyServer.sc2api.getSeason).toBe("function");
  });

  it("exposes getLegacyMatchHistory() method", () => {
    expect(typeof fastifyServer.sc2api.getLegacyMatchHistory).toBe("function");
  });

  it("exposes getLegacyAchievements() method", () => {
    expect(typeof fastifyServer.sc2api.getLegacyAchievements).toBe("function");
  });

  it("exposes getLegacyRewards() method", () => {
    expect(typeof fastifyServer.sc2api.getLegacyRewards).toBe("function");
  });
});
