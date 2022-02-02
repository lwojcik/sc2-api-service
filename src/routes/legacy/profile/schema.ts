import responseSchema from "../../../schemas/response/index";
import {
  str,
  obj,
  oneOfNum,
  num,
  numOnly,
  oneOfStr,
  arr,
} from "../../../helpers/schema";

const realms = [1, 2];

const races = ["TERRAN", "ZERG", "PROTOSS", "RANDOM"];

const ranks = [
  "BRONZE",
  "SILVER",
  "GOLD",
  "PLATINUM",
  "DIAMOND",
  "MASTER",
  "GRANDMASTER",
];

const campaignDifficulties = ["CASUAL", "NORMAL", "BRUTAL"];

const modes = ["1v1", "2v2", "3v3", "4v4", "Archon"];

const swarmLevel = {
  ...obj,
  properties: {
    level: num,
    totalLevelXP: num,
    currentLevelXP: num,
  },
};

const seasonStat = {
  ...obj,
  properties: {
    type: oneOfStr(modes),
    wins: num,
    games: num,
  },
};

const achievement = {
  ...obj,
  properties: {
    achievementId: str,
    completionDate: num,
  },
};

const bnetData = {
  id: str,
  realm: oneOfNum(realms),
  displayName: str,
  clanName: str,
  clanTag: str,
  profilePath: str,
  portrait: {
    ...obj,
    properties: {
      x: num,
      y: num,
      w: num,
      h: num,
      offset: num,
      url: str,
    },
  },
  career: {
    ...obj,
    properties: {
      primaryRace: oneOfStr(races),
      terranWins: num,
      protossWins: num,
      zergWins: num,
      highest1v1Rank: oneOfStr(ranks),
      highestTeamRank: oneOfStr(ranks),
      seasonTotalGames: num,
      careerTotalGames: num,
    },
  },
  swarmLevels: {
    ...obj,
    properties: {
      level: num,
      terran: swarmLevel,
      zerg: swarmLevel,
      protoss: swarmLevel,
    },
  },
  campaign: {
    ...obj,
    properties: {
      wol: oneOfStr(campaignDifficulties),
      hots: oneOfStr(campaignDifficulties),
      lotv: oneOfStr(campaignDifficulties),
    },
  },
  season: {
    ...obj,
    properties: {
      seasonId: num,
      seasonNumber: num,
      seasonYear: num,
      totalGamesThisSeason: num,
      stats: {
        ...arr,
        items: seasonStat,
      },
    },
  },
  rewards: {
    ...obj,
    properties: {
      selected: {
        ...arr,
        items: str,
      },
      earned: {
        ...arr,
        items: str,
      },
    },
  },
  achievements: {
    ...obj,
    properties: {
      points: {
        ...obj,
        properties: {
          totalPoints: num,
          categoryPoints: {
            ...obj,
            patternProperties: {
              ".*": numOnly,
            },
          },
        },
      },
      achievements: {
        ...arr,
        items: achievement,
      },
    },
  },
};

export default {
  response: responseSchema(bnetData),
};
