import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import StarCraft2API from 'starcraft2-api';
import BlizzAPI from 'blizzapi';
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

    const sc2Api = async () => new StarCraft2API({
        region,
        clientId: '',
        clientSecret: '',
        accessToken: await server.bas.getAccessToken(false),
      });

    const cacheObject = async ({ segment, data, ttl }: DataObject) => {
      if (!enable) return 'Object not cached (Cache disabled)';
      await cache.set(segment, JSON.stringify(data));
      await cache.expire(segment, ttl);
      return 'Object cached successfully';
    };

    const getCachedObject = (segment: string) => server.redis.get(segment);

    const getDataObject = async (
      { segment, dataFn, ttl }: DataObjectToCache,
      refresh?: boolean,
    ) => {
      const isItCached = refresh ? false : await isDataCached(segment);
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

    const getProfile = async (
      { regionId, realmId, profileId }: PlayerObject,
      refresh?: boolean,
    ) =>
      getDataObject(
        {
          segment: `profile-${regionId}-${realmId}-${profileId}`,
          dataFn: (await sc2Api()).queryProfile({ regionId, realmId, profileId }),
          ttl: ttl.profile,
        },
        refresh,
      );

    const getStaticProfileData = async (
      regionId: number,
      refresh?: boolean,
    ) => {
      return getDataObject(
        {
          segment: `staticProfileData-${regionId}`,
          dataFn: (await sc2Api()).queryStaticProfileData(regionId),
          ttl: ttl.static,
        },
        refresh,
      );
    };

    const getProfileMetadata = async (
      { regionId, realmId, profileId }: PlayerObject,
      refresh?: boolean,
    ) =>
      getDataObject(
        {
          segment: `metadata-${regionId}-${realmId}-${profileId}`,
          dataFn: (await sc2Api()).queryProfileMetadata({
            regionId,
            realmId,
            profileId,
          }),
          ttl: ttl.metadata,
        },
        refresh,
      );

    const getLadderSummary = async (
      { regionId, realmId, profileId }: PlayerObject,
      refresh?: boolean,
    ) =>
      getDataObject(
        {
          segment: `ladderSummary-${regionId}-${realmId}-${profileId}`,
          dataFn: (await sc2Api()).queryLadderSummary({
            regionId,
            realmId,
            profileId,
          }),
          ttl: ttl.ladderSummary,
        },
        refresh,
      );

    const getLadder = async (
      { regionId, realmId, profileId, ladderId }: PlayerLadder,
      refresh?: boolean,
    ) =>
      getDataObject(
        {
          segment: `ladder-${regionId}-${realmId}-${profileId}-${ladderId}`,
          dataFn: (await sc2Api()).queryPlayerLadder({
            regionId,
            realmId,
            profileId,
          },
          ladderId),
          ttl: ttl.ladder,
        },
        refresh,
      );

    const getLeague = async (
      { seasonId, queueId, teamType, leagueId }: LeagueObject,
      refresh?: boolean,
    ) => {
      const accessToken = await server.bas.getAccessToken();
      const blizzapiInstance = new BlizzAPI({
        region: parseInt(opts.bnet.region, 10),
        clientId: '',
        clientSecret: '',
        accessToken,
      });
      return getDataObject(
        {
          segment: `league-${seasonId}-${queueId}-${teamType}-${leagueId}`,
          dataFn: blizzapiInstance.query(
            `/data/sc2/league/${seasonId}/${queueId}/${teamType}/${leagueId}`,
          ),
          ttl: ttl.league,
        },
        refresh,
      );
    };

    const getSeason = async (regionId: number, refresh?: boolean) =>
      getDataObject(
        {
          segment: `season-${regionId}`,
          dataFn: (await sc2Api()).querySeason(regionId),
          ttl: ttl.season,
        },
        refresh,
      );

    const getGrandmasterLeaderboard = async (
      regionId: number,
      refresh?: boolean,
    ) =>
      getDataObject(
        {
          segment: `grandmaster-${regionId}`,
          dataFn: (await sc2Api()).queryGrandmasterLeaderboard(regionId),
          ttl: ttl.grandmaster,
        },
        refresh,
      );

    const getLegacyProfile = async (
      { regionId, realmId, profileId }: PlayerObject,
      refresh?: boolean,
    ) =>
      getDataObject(
        {
          segment: `legacyProfile-${regionId}-${realmId}-${profileId}`,
          dataFn: (await sc2Api()).queryLegacyProfile({
            regionId,
            realmId,
            profileId,
          }),
          ttl: ttl.legacy.profile,
        },
        refresh,
      );

    const getLegacyLadders = async (
      { regionId, realmId, profileId }: PlayerObject,
      refresh?: boolean,
    ) =>
      getDataObject(
        {
          segment: `legacyLadders-${regionId}-${realmId}-${profileId}`,
          dataFn: (await sc2Api()).queryLegacyLadders({
            regionId,
            realmId,
            profileId,
          }),
          ttl: ttl.legacy.ladders,
        },
        refresh,
      );

    const getLegacyLadder = async (
      regionId: number,
      ladderId: string,
      refresh?: boolean,
    ) =>
      getDataObject(
        {
          segment: `legacyLadder-${regionId}-${ladderId}`,
          dataFn: (await sc2Api()).queryLegacyLadder(regionId, ladderId),
          ttl: ttl.legacy.ladder,
        },
        refresh,
      );

    const getLegacyMatchHistory = async (
      { regionId, realmId, profileId }: PlayerObject,
      refresh?: boolean,
    ) =>
      getDataObject(
        {
          segment: `legacyMatchHistory-${regionId}-${realmId}-${profileId}`,
          dataFn: (await sc2Api()).queryLegacyMatchHistory({
            regionId,
            realmId,
            profileId,
          }),
          ttl: ttl.legacy.matchHistory,
        },
        refresh,
      );

    const getLegacyAchievements = async (regionId: number, refresh?: boolean) =>
      getDataObject(
        {
          segment: `legacyAchievements-${regionId}`,
          dataFn: (await sc2Api()).queryLegacyAchievements(regionId),
          ttl: ttl.legacy.achievements,
        },
        refresh,
      );

    const getLegacyRewards = async (regionId: number, refresh?: boolean) =>
      getDataObject(
        {
          segment: `legacyRewards-${regionId}`,
          dataFn: (await sc2Api()).queryLegacyRewards(regionId),
          ttl: ttl.legacy.rewards,
        },
        refresh,
      );

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
