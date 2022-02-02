import status from "./status";
import profile from "./profile/profile";
import staticData from "./profile/static";
import metadata from "./profile/metadata";
import ladderSummary from "./profile/ladderSummary";
import ladder from "./profile/ladder";
import grandmaster from "./ladder/grandmaster";
import season from "./ladder/season";
import legacyProfile from "./legacy/profile";
import legacyLadders from "./legacy/ladders";
import legacyMatches from "./legacy/matches";
import legacyLadder from "./legacy/ladder";
import legacyAchievements from "./legacy/achievements";
import legacyRewards from "./legacy/rewards";
import leagueData from "./data/league";

export default {
  status,
  profile: {
    profile,
    staticData,
    metadata,
    ladderSummary,
    ladder,
  },
  ladder: {
    grandmaster,
    season,
  },
  legacy: {
    profile: legacyProfile,
    ladders: legacyLadders,
    matches: legacyMatches,
    ladder: legacyLadder,
    achievements: legacyAchievements,
    rewards: legacyRewards,
  },
  data: {
    league: leagueData,
  },
};
