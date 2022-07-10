import { Injectable } from '@nestjs/common';

@Injectable()
export class MainService {
  getMain() {
    return {
      name: 'sc2-api-service',
      endpoints: {
        status: {
          url: '/status',
          method: 'GET',
        },
        getLeague: {
          url: '/data/league/:seasonId/:queueId/:teamType/:leagueId',
          method: 'GET',
        },
        getGrandmaster: {
          url: '/ladder/grandmaster/:regionId',
          method: 'GET',
        },
        getSeason: {
          url: '/ladder/season/:regionId',
          method: 'GET',
        },
        getStatic: {
          url: '/profile/static/:regionId',
          method: 'GET',
        },
        getMetadata: {
          url: '/profile/metadata/:regionId/:realmId/:profileId',
          method: 'GET',
        },
        getProfile: {
          url: '/profile/profile/:regionId/:realmId/:profileId',
          method: 'GET',
        },
        getLadderSummary: {
          url: '/profile/laddersummary/:regionId/:realmId/:profileId',
          method: 'GET',
        },
        getPlayerLadder: {
          url: '/profile/ladder/:regionId/:realmId/:profileId/:ladderId',
          method: 'GET',
        },
        getLegacyProfile: {
          url: '/legacy/profile/:regionId/:realmId/:profileId',
          method: 'GET',
        },
        getLegacyLadders: {
          url: '/legacy/ladders/:regionId/:realmId/:profileId',
          method: 'GET',
        },
        getLegacyMatches: {
          url: '/legacy/matches/:regionId/:realmId/:profileId',
          method: 'GET',
        },
        getLegacyLadder: {
          url: '/legacy/ladder/:ladderId',
          method: 'GET',
        },
        getLegacyAchievements: {
          url: '/achievements/:regionId',
          method: 'GET',
        },
      },
    };
  }
}
