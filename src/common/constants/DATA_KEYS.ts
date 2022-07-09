import { Sc2DataKey } from '../types/Sc2DataKey.enum';

export const DATA_KEYS = {
  data: {
    getLeague: Sc2DataKey.getLeague,
  },
  ladder: {
    getGrandmaster: Sc2DataKey.getGrandmaster,
    getSeason: Sc2DataKey.getSeason,
  },
  profile: {
    getStatic: Sc2DataKey.getStatic,
    getMetadata: Sc2DataKey.getMetadata,
    getProfile: Sc2DataKey.getProfile,
    getLadderSummary: Sc2DataKey.getLadderSummary,
    getPlayerLadder: Sc2DataKey.getPlayerLadder,
  },
  legacy: {
    getProfile: Sc2DataKey.getLegacyProfile,
    getLadders: Sc2DataKey.getLegacyLadders,
    getMatches: Sc2DataKey.getLegacyMatches,
    getLadder: Sc2DataKey.getLegacyLadder,
    getAchievements: Sc2DataKey.getLegacyAchievements,
    getRewards: Sc2DataKey.getLegacyRewards,
  },
};
