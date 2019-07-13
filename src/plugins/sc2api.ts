import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { StarCraft2API } from 'starcraft2-api';
import { BlizzAPI } from 'blizzapi';
import { PassThrough } from 'stream';
import { PlayerObject, LeagueObject, PlayerLadder } from '../@types/fastify';

export interface BnetConfig {
  [key: string]: string | number | boolean;
  region: string;
}

export interface RedisConfig {
  [key: string]: string | number | boolean | object;
  enable: boolean;
  replyCachePeriod: number;
  ttl: {
    profile: number;
    static: number;
    metadata: number;
    ladderSummary: number;
    ladder: number;
    grandmaster: number;
    season: number;
    league: number;
    legacy: {
      profile: number;
      ladders: number;
      ladder: number;
      matchHistory: number;
      rewards: number;
      achievements: number;
    };
  };
}

export interface Sc2ApiOptions {
  bnet: BnetConfig;
  redis: RedisConfig;
}

interface DataObjectToCache {
  segment: string;
  dataFn: Promise<any>;
  ttl: number;
}

interface DataObject {
  segment: string;
  data: object;
  ttl: number;
}

export default fp(
  (server: FastifyInstance, opts: Sc2ApiOptions, next: Function) => {
    const { bnet, redis } = opts;
    const { region } = bnet;
    const { enable, ttl } = redis;
    const cache = server.redis;

    const isDataCached = async (segment: string) => {
      if (server.redis && enable) {
        return (await server.redis.get(segment)) ? true : false;
      }
      return Promise.resolve(false);
    };

    const sc2Api = async () =>
      new StarCraft2API(region, '', '', await server.bas.getAccessToken(false));

    const cacheObject = async ({ segment, data, ttl }: DataObject) => {
      if (!enable) return 'Object not cached (Cache disabled)';
      await cache.set(segment, JSON.stringify(data));
      await cache.expire(segment, ttl);
      return 'Object cached successfully';
    };

    const getCachedObject = (segment: string) => server.redis.get(segment);

    const getDataObject = async ({
      segment,
      dataFn,
      ttl,
    }: DataObjectToCache) => {
      const isItCached = await isDataCached(segment);
      if (!isItCached) {
        const response = await dataFn;

        /* istanbul ignore next */
        if (!!response.body && response.body.constructor === PassThrough) {
          await server.accessToken.getAccessToken(true);
          return {
            status: 400,
            data: 'No data returned from Battle.net API',
          };
        }

        const data = {
          status: 200,
          data: response,
        };
        await cacheObject({ segment, data, ttl } as DataObject);
        return data;
      }
      return JSON.parse(await getCachedObject(segment));
    };

    const getProfile = async ({ regionId, realmId, profileId }: PlayerObject) =>
      getDataObject({
        segment: `profile-${regionId}-${realmId}-${profileId}`,
        dataFn: (await sc2Api()).queryProfile(regionId, realmId, profileId),
        ttl: ttl.profile,
      });

    const getStaticProfileData = async (regionId: number) => {
      return getDataObject({
        segment: `staticProfileData-${regionId}`,
        dataFn: (await sc2Api()).queryStaticProfileData(regionId),
        ttl: ttl.static,
      });
    };

    const getProfileMetadata = async ({
      regionId,
      realmId,
      profileId,
    }: PlayerObject) =>
      getDataObject({
        segment: `metadata-${regionId}-${realmId}-${profileId}`,
        dataFn: (await sc2Api()).queryProfileMetadata(
          regionId,
          realmId,
          profileId,
        ),
        ttl: ttl.metadata,
      });

    const getLadderSummary = async ({
      regionId,
      realmId,
      profileId,
    }: PlayerObject) =>
      getDataObject({
        segment: `ladderSummary-${regionId}-${realmId}-${profileId}`,
        dataFn: (await sc2Api()).queryLadderSummary(
          regionId,
          realmId,
          profileId,
        ),
        ttl: ttl.ladderSummary,
      });

    const getLadder = async ({
      regionId,
      realmId,
      profileId,
      ladderId,
    }: PlayerLadder) =>
      getDataObject({
        segment: `ladder-${regionId}-${realmId}-${profileId}-${ladderId}`,
        dataFn: (await sc2Api()).queryPlayerLadder(
          regionId,
          realmId,
          profileId,
          ladderId,
        ),
        ttl: ttl.ladder,
      });

    const getLeague = async ({
      seasonId,
      queueId,
      teamType,
      leagueId,
    }: LeagueObject) => {
      const accessToken = await server.bas.getAccessToken();
      const blizzapiInstance = new BlizzAPI(
        parseInt(opts.bnet.region, 10),
        '',
        '',
        accessToken,
      );
      return getDataObject({
        segment: `league-${seasonId}-${queueId}-${teamType}-${leagueId}`,
        dataFn: blizzapiInstance.query(
          `/data/sc2/league/${seasonId}/${queueId}/${teamType}/${leagueId}`,
        ),
        ttl: ttl.league,
      });
    };

    const getSeason = async (regionId: number) =>
      getDataObject({
        segment: `season-${regionId}`,
        dataFn: (await sc2Api()).querySeason(regionId),
        ttl: ttl.season,
      });

    const getGrandmasterLeaderboard = async (regionId: number) =>
      getDataObject({
        segment: `grandmaster-${regionId}`,
        dataFn: (await sc2Api()).queryGrandmasterLeaderboard(regionId),
        ttl: ttl.grandmaster,
      });

    const getLegacyProfile = async ({
      regionId,
      realmId,
      profileId,
    }: PlayerObject) =>
      getDataObject({
        segment: `legacyProfile-${regionId}-${realmId}-${profileId}`,
        dataFn: (await sc2Api()).queryLegacyProfile(
          regionId,
          realmId,
          profileId,
        ),
        ttl: ttl.legacy.profile,
      });

    const getLegacyLadders = async ({
      regionId,
      realmId,
      profileId,
    }: PlayerObject) =>
      getDataObject({
        segment: `legacyLadders-${regionId}-${realmId}-${profileId}`,
        dataFn: (await sc2Api()).queryLegacyLadders(
          regionId,
          realmId,
          profileId,
        ),
        ttl: ttl.legacy.ladders,
      });

    const getLegacyLadder = async (regionId: number, ladderId: string) =>
      getDataObject({
        segment: `legacyLadder-${regionId}-${ladderId}`,
        dataFn: (await sc2Api()).queryLegacyLadder(regionId, ladderId),
        ttl: ttl.legacy.ladder,
      });

    const getLegacyMatchHistory = async ({
      regionId,
      realmId,
      profileId,
    }: PlayerObject) =>
      getDataObject({
        segment: `legacyMatchHistory-${regionId}-${realmId}-${profileId}`,
        dataFn: (await sc2Api()).queryLegacyMatchHistory(
          regionId,
          realmId,
          profileId,
        ),
        ttl: ttl.legacy.matchHistory,
      });

    const getLegacyAchievements = async (regionId: number) =>
      getDataObject({
        segment: `legacyAchievements-${regionId}`,
        dataFn: (await sc2Api()).queryLegacyAchievements(regionId),
        ttl: ttl.legacy.achievements,
      });

    const getLegacyRewards = async (regionId: number) =>
      getDataObject({
        segment: `legacyRewards-${regionId}`,
        dataFn: (await sc2Api()).queryLegacyRewards(regionId),
        ttl: ttl.legacy.rewards,
      });

    server.decorate('sc2api', {
      getProfile,
      getStaticProfileData,
      getProfileMetadata,
      getLadderSummary,
      getLadder,
      getLegacyProfile,
      getLegacyLadders,
      getLegacyLadder,
      getLeague,
      getGrandmasterLeaderboard,
      getSeason,
      getLegacyMatchHistory,
      getLegacyAchievements,
      getLegacyRewards,
    });
    next();
  },
);
