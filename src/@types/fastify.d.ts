import * as fastify from 'fastify';
import * as http from 'http';
import profile from '../routes/profile/profile';

interface ApiResponse {
  status: number;
  data: object;
}

export interface PlayerObject {
  regionId: number;
  realmId: number;
  profileId: string;
}

export interface PlayerLadder extends PlayerObject {
  ladderId: number;
}

export interface LeagueObject {
  seasonId: number;
  queueId: number;
  teamType: string;
  leagueId: string;
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
      getProfile: (object: PlayerObject) => Promise<ApiResponse>;
      getStaticProfileData: (regionId) => Promise<ApiResponse>;
      getProfileMetadata: (object: PlayerObject) => Promise<ApiResponse>;
      getLadderSummary: (object: PlayerObject) => Promise<ApiResponse>;
      getLadder: (object: PlayerLadder) => Promise<ApiResponse>;
      getLeague: (object: LeagueObject) => Promise<ApiResponse>;
      getGrandmasterLeaderboard: (regionId) => Promise<ApiResponse>;
      getSeason: (regionId) => Promise<ApiResponse>;
      getLegacyProfile: (object: PlayerObject) => Promise<ApiResponse>;
      getLegacyLadders: (object: PlayerObject) => Promise<ApiResponse>;
      getLegacyLadder: (regionId, ladderId) => Promise<ApiResponse>;
      getLegacyMatchHistory: (object: PlayerObject) => Promise<ApiResponse>;
      getLegacyAchievements: (regionId) => Promise<ApiResponse>;
      getLegacyRewards: (regionId) => Promise<ApiResponse>;
    };
  }
}
