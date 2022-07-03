import { Sc2DataKey } from '../types/Sc2DataKey.enum';

export const SC2API_METHOD_MAPPINGS = {
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
  [Sc2DataKey.getLegacyMatches]: 'queryLegacyMatches',
  [Sc2DataKey.getLegacyLadder]: 'queryLegacyLadder',
  [Sc2DataKey.getLegacyAchievements]: 'queryLegacyAchievements',
  [Sc2DataKey.getLegacyRewards]: 'queryLegacyRewards',
};
