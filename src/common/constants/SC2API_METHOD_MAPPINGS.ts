import { StarCraft2API } from 'starcraft2-api';
import { Sc2DataKey } from '../types/Sc2DataKey.enum';

type Sc2ApiMethodMappings = {
  [key in Sc2DataKey]: string;
};

export const SC2API_METHOD_MAPPINGS: Sc2ApiMethodMappings = {
  [Sc2DataKey.getLeague]: StarCraft2API.prototype.queryLeagueData.name,
  [Sc2DataKey.getGrandmaster]:
    StarCraft2API.prototype.queryGrandmasterLeaderboard.name,
  [Sc2DataKey.getSeason]: StarCraft2API.prototype.querySeason.name,
  [Sc2DataKey.getStatic]: StarCraft2API.prototype.queryStaticProfileData.name,
  [Sc2DataKey.getMetadata]: StarCraft2API.prototype.queryProfileMetadata.name,
  [Sc2DataKey.getProfile]: StarCraft2API.prototype.queryProfile.name,
  [Sc2DataKey.getLadderSummary]:
    StarCraft2API.prototype.queryLadderSummary.name,
  [Sc2DataKey.getPlayerLadder]: StarCraft2API.prototype.queryPlayerLadder.name,
  [Sc2DataKey.getLegacyProfile]:
    StarCraft2API.prototype.queryLegacyProfile.name,
  [Sc2DataKey.getLegacyLadders]:
    StarCraft2API.prototype.queryLegacyLadders.name,
  [Sc2DataKey.getLegacyMatches]:
    StarCraft2API.prototype.queryLegacyMatchHistory.name,
  [Sc2DataKey.getLegacyLadder]: StarCraft2API.prototype.queryLegacyLadder.name,
  [Sc2DataKey.getLegacyAchievements]:
    StarCraft2API.prototype.queryLegacyAchievements.name,
  [Sc2DataKey.getLegacyRewards]:
    StarCraft2API.prototype.queryLegacyRewards.name,
};
