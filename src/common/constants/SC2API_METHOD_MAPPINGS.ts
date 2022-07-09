import { Sc2DataKey } from '../types/Sc2DataKey.enum';

type Sc2ApiMethodMappings = {
  [key in Sc2DataKey | string]: string;
};

export const SC2API_METHOD_MAPPINGS: Sc2ApiMethodMappings = {
  [Sc2DataKey.getLeague]: 'queryLeagueData',
  [Sc2DataKey.getGrandmaster]: 'queryGrandmasterLeaderboard',
  [Sc2DataKey.getSeason]: 'querySeason',
  [Sc2DataKey.getStatic]: 'queryStaticProfileData',
  [Sc2DataKey.getMetadata]: 'queryProfileMetadata',
  [Sc2DataKey.getProfile]: 'queryProfile',
  [Sc2DataKey.getLadderSummary]: 'queryLadderSummary',
  [Sc2DataKey.getPlayerLadder]: 'queryPlayerLadder',
  [Sc2DataKey.getLegacyProfile]: 'queryLegacyProfile',
  [Sc2DataKey.getLegacyLadders]: 'queryLegacyLadders',
  [Sc2DataKey.getLegacyMatches]: 'queryLegacyMatchHistory',
  [Sc2DataKey.getLegacyLadder]: 'queryLegacyLadder',
  [Sc2DataKey.getLegacyAchievements]: 'queryLegacyAchievements',
  [Sc2DataKey.getLegacyRewards]: 'queryLegacyRewards',
};
