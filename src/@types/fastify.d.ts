/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlayerObject, League } from "starcraft2-api";

interface ApiResponse {
  status: number;
  data: object;
}

export interface PlayerLadder extends PlayerObject {
  ladderId: number;
}

export interface RouteQueryString {
  refresh?: boolean;
}

declare module "fastify" {
  export interface FastifyInstance {
    blipp(): void;
    cache: {
      has: (key) => boolean;
      set: (key, value, cachePeriod) => any;
      get: (key) => Promise<{
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
      getAccessToken: (refresh?: boolean) => Promise<string>;
      refreshAccessToken: () => Promise<string>;
    };
    sc2api: {
      getProfile: (
        object: PlayerObject,
        refresh?: boolean
      ) => Promise<ApiResponse>;
      getStaticProfileData: (
        regionId: number | string,
        refresh?: boolean
      ) => Promise<ApiResponse>;
      getProfileMetadata: (
        object: PlayerObject,
        refresh?: boolean
      ) => Promise<ApiResponse>;
      getLadderSummary: (
        object: PlayerObject,
        refresh?: boolean
      ) => Promise<ApiResponse>;
      getLadder: (
        object: PlayerLadder,
        refresh?: boolean
      ) => Promise<ApiResponse>;
      getLeague: (object: League, refresh?: boolean) => Promise<ApiResponse>;
      getGrandmasterLeaderboard: (
        regionId: string | number,
        refresh?: boolean
      ) => Promise<ApiResponse>;
      getSeason: (
        regionId: string | number,
        refresh?: boolean
      ) => Promise<ApiResponse>;
      getLegacyProfile: (
        object: PlayerObject,
        refresh?: boolean
      ) => Promise<ApiResponse>;
      getLegacyLadders: (
        object: PlayerObject,
        refresh?: boolean
      ) => Promise<ApiResponse>;
      getLegacyLadder: (
        regionId: string | number,
        ladderId: string | number,
        refresh?: boolean
      ) => Promise<ApiResponse>;
      getLegacyMatchHistory: (
        object: PlayerObject,
        refresh?: boolean
      ) => Promise<ApiResponse>;
      getLegacyAchievements: (
        regionId: string | number,
        refresh?: boolean
      ) => Promise<ApiResponse>;
      getLegacyRewards: (regionId, refresh?: boolean) => Promise<ApiResponse>;
    };
  }
}
