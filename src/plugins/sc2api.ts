import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { StarCraft2API } from 'starcraft2-api';
import { BlizzAPI } from 'blizzapi';
import { PassThrough } from 'stream';

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

    const getSc2ApiInstance = async () =>
      new StarCraft2API(region, '', '', await server.bas.getAccessToken(false));

    const cacheObject = async (
      segment: string,
      dataObject: object,
      ttl: number,
    ) => {
      if (!enable) return 'Object not cached (Cache disabled)';
      await cache.set(segment, JSON.stringify(dataObject));
      await cache.expire(segment, ttl);
      return 'Object cached successfully';
    };

    const getCachedObject = (segment: string) => server.redis.get(segment);

    const getDataObject = async (
      segment: string,
      dataFunction: Promise<any>,
      ttl: number,
    ) => {
      const isItCached = await isDataCached(segment);
      if (!isItCached) {
        const response = await dataFunction;

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
        await cacheObject(segment, data, ttl);
        return data;
      }
      return JSON.parse(await getCachedObject(segment));
    };

    const getProfile = async (
      regionId: number,
      realmId: number,
      profileId: string,
    ) => {
      const segment = `profile-${regionId}-${realmId}-${profileId}`;
      const sc2ApiInstance = await getSc2ApiInstance();
      return getDataObject(
        segment,
        sc2ApiInstance.queryProfile(regionId, realmId, profileId),
        ttl.profile,
      );
    };

    const getStaticProfileData = async (regionId: number) => {
      const segment = `staticProfileData-${regionId}`;
      const sc2ApiInstance = await getSc2ApiInstance();
      return getDataObject(
        segment,
        sc2ApiInstance.queryStaticProfileData(regionId),
        ttl.static,
      );
    };

    const getProfileMetadata = async (
      regionId: number,
      realmId: number,
      profileId: string,
    ) => {
      const segment = `metadata-${regionId}-${realmId}-${profileId}`;
      const sc2ApiInstance = await getSc2ApiInstance();
      return getDataObject(
        segment,
        sc2ApiInstance.queryProfileMetadata(regionId, realmId, profileId),
        ttl.metadata,
      );
    };

    const getLadderSummary = async (
      regionId: number,
      realmId: number,
      profileId: string,
    ) => {
      const segment = `ladderSummary-${regionId}-${realmId}-${profileId}`;
      const sc2ApiInstance = await getSc2ApiInstance();
      return getDataObject(
        segment,
        sc2ApiInstance.queryLadderSummary(regionId, realmId, profileId),
        ttl.ladderSummary,
      );
    };

    const getLadder = async (
      regionId: number,
      realmId: number,
      profileId: string,
      ladderId: string,
    ) => {
      const segment = `ladder-${regionId}-${realmId}-${profileId}-${ladderId}`;
      const sc2ApiInstance = await getSc2ApiInstance();
      return getDataObject(
        segment,
        sc2ApiInstance.queryPlayerLadder(
          regionId,
          realmId,
          profileId,
          ladderId,
        ),
        ttl.ladder,
      );
    };

    const getLeague = async (
      seasonId: number,
      queueId: number,
      teamType: string,
      leagueId: string,
    ) => {
      const segment = `league-${seasonId}-${queueId}-${teamType}-${leagueId}`;
      const accessToken = await server.bas.getAccessToken();
      const blizzapiInstance = new BlizzAPI(
        parseInt(opts.bnet.region, 10),
        '',
        '',
        accessToken,
      );
      return getDataObject(
        segment,
        blizzapiInstance.query(
          `/data/sc2/league/${seasonId}/${queueId}/${teamType}/${leagueId}`,
        ),
        ttl.league,
      );
    };

    const getSeason = async (regionId: number) => {
      const segment = `season-${regionId}`;
      const sc2ApiInstance = await getSc2ApiInstance();
      return getDataObject(
        segment,
        sc2ApiInstance.querySeason(regionId),
        ttl.season,
      );
    };

    const getGrandmasterLeaderboard = async (regionId: number) => {
      const segment = `grandmaster-${regionId}`;
      const sc2ApiInstance = await getSc2ApiInstance();
      return getDataObject(
        segment,
        sc2ApiInstance.queryGrandmasterLeaderboard(regionId),
        ttl.grandmaster,
      );
    };

    const getLegacyProfile = async (
      regionId: number,
      realmId: number,
      profileId: string,
    ) => {
      const segment = `legacyProfile-${regionId}-${realmId}-${profileId}`;
      const sc2ApiInstance = await getSc2ApiInstance();
      return getDataObject(
        segment,
        sc2ApiInstance.queryLegacyProfile(regionId, realmId, profileId),
        ttl.legacy.profile,
      );
    };

    const getLegacyLadders = async (
      regionId: number,
      realmId: number,
      profileId: string,
    ) => {
      const segment = `legacyLadders-${regionId}-${realmId}-${profileId}`;
      const sc2ApiInstance = await getSc2ApiInstance();
      return getDataObject(
        segment,
        sc2ApiInstance.queryLegacyLadders(regionId, realmId, profileId),
        ttl.legacy.ladders,
      );
    };

    const getLegacyLadder = async (regionId: number, ladderId: string) => {
      const segment = `legacyLadder-${regionId}-${ladderId}`;
      const sc2ApiInstance = await getSc2ApiInstance();
      return getDataObject(
        segment,
        sc2ApiInstance.queryLegacyLadder(regionId, ladderId),
        ttl.legacy.ladder,
      );
    };

    const getLegacyMatchHistory = async (
      regionId: number,
      realmId: number,
      profileId: string,
    ) => {
      const segment = `legacyMatchHistory-${regionId}-${realmId}-${profileId}`;
      const sc2ApiInstance = await getSc2ApiInstance();
      return getDataObject(
        segment,
        sc2ApiInstance.queryLegacyMatchHistory(regionId, realmId, profileId),
        ttl.legacy.matchHistory,
      );
    };

    const getLegacyAchievements = async (regionId: number) => {
      const segment = `legacyAchievements-${regionId}`;
      const sc2ApiInstance = await getSc2ApiInstance();
      return getDataObject(
        segment,
        sc2ApiInstance.queryLegacyAchievements(regionId),
        ttl.legacy.achievements,
      );
    };

    const getLegacyRewards = async (regionId: number) => {
      const segment = `legacyRewards-${regionId}`;
      const sc2ApiInstance = await getSc2ApiInstance();
      return getDataObject(
        segment,
        sc2ApiInstance.queryLegacyRewards(regionId),
        ttl.legacy.rewards,
      );
    };

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
