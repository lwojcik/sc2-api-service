import * as fastify from 'fastify';
import * as http from 'http';

interface ApiResponse {
  status: number;
  data: object;
}

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
  > {
    blipp(): void;
    cache: {
      has: (key) => boolean;
      set: (key, value, cachePeriod) => any;
      get: (
        key,
      ) => Promise<{
        item: string;
        stored: number;
        ttl: number;
      }>;
    };
    log(): void;
    close(): Promise<any>;
    accessToken: {
      getAccessToken: (refresh: boolean) => Promise<string>;
      getFreshAccessToken;
      getCachedAccessToken;
      isAccessTokenCached;
      cacheAccessToken;
    };
    redis: {
      set: (key, value) => Promise<void>;
      get: (key) => Promise<any>;
      expire: (key, value) => Promise<any>;
      ttl: (key) => Promise<number>;
    };
    bas: {
      getAccessToken: (refresh?: Boolean) => Promise<string>;
      refreshAccessToken: () => Promise<string>;
    };
    sc2api: {
      getProfile: (regionId, realmId, profileId) => Promise<ApiResponse>;
      getStaticProfileData: (regionId) => Promise<ApiResponse>;
      getProfileMetadata: (
        regionId,
        realmId,
        profileId,
      ) => Promise<ApiResponse>;
      getLadderSummary: (regionId, realmId, profileId) => Promise<ApiResponse>;
      getLadder: (
        regionId,
        realmId,
        profileId,
        ladderId,
      ) => Promise<ApiResponse>;
      getLeague: (
        seasonId,
        queueId,
        teamType,
        leagueId,
      ) => Promise<ApiResponse>;
      getGrandmasterLeaderboard: (regionId) => Promise<ApiResponse>;
      getSeason: (regionId) => Promise<ApiResponse>;
      getLegacyProfile: (regionId, realmId, profileId) => Promise<ApiResponse>;
      getLegacyLadders: (regionId, realmId, profileId) => Promise<ApiResponse>;
      getLegacyLadder: (regionId, ladderId) => Promise<ApiResponse>;
      getLegacyMatchHistory: (
        regionId,
        realmId,
        profileId,
      ) => Promise<ApiResponse>;
      getLegacyAchievements: (regionId) => Promise<ApiResponse>;
      getLegacyRewards: (regionId) => Promise<ApiResponse>;
    };
  }
}
