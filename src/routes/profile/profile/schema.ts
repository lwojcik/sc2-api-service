import responseSchema from '../../../schemas/response/index';
import {
  str,
  obj,
  bool,
  arr,
  oneOfStr,
  num,
  oneOfNum,
} from '../../../helpers/schema';

const ranks = [
  'BRONZE',
  'SILVER',
  'GOLD',
  'PLATINUM',
  'DIAMOND',
  'MASTER',
  'GRANDMASTER',
];

const realms = [1, 2];

const campaignDifficulties = ['CASUAL', 'NORMAL', 'BRUTAL'];

const modeProps = {
  rank: num,
  leagueName: oneOfStr(ranks),
  totalGames: num,
  totalWins: num,
};

const snapshotMode = {
  ...obj,
  properties: modeProps,
};

const seasonFinish = {
  ...obj,
  properties: {
    leagueName: oneOfStr(ranks),
    timesAchieved: num,
  },
};

const raceLevel = {
  ...obj,
  properties: {
    level: num,
    maxLevelPoints: num,
    currentLevelPoints: num,
  },
};

const bnetData = {
  summary: {
    ...obj,
    properties: {
      id: str,
      realm: oneOfNum(realms),
      displayName: str,
      clanName: str,
      clanTag: str,
      portrait: str,
      decalTerran: str,
      decalProtoss: str,
      decalZerg: str,
      totalSwarmLevel: num,
      totalAchievementPoints: num,
    },
  },
  snapshot: {
    ...obj,
    properties: {
      seasonSnapshot: {
        ...obj,
        properties: {
          '1v1': snapshotMode,
          '2v2': snapshotMode,
          '3v3': snapshotMode,
          '4v4': snapshotMode,
          Archon: snapshotMode,
        },
      },
      totalRankedSeasonGamesPlayed: num,
    },
  },
  career: {
    ...obj,
    properties: {
      terranWins: num,
      zergWins: num,
      protossWins: num,
      totalCareerGames: num,
      current1v1LeagueName: oneOfStr(ranks),
      currentBestTeamLeagueName: oneOfStr(ranks),
      best1v1Finish: seasonFinish,
      bestTeamFinish: seasonFinish,
    },
  },
  smarmLevels: {
    ...obj,
    properties: {
      level: num,
      terran: raceLevel,
      zerg: raceLevel,
      protoss: raceLevel,
    },
  },
  campaign: {
    ...obj,
    properties: {
      difficultyCompleted: {
        ...obj,
        properties: {
          'wings-of-liberty': oneOfStr(campaignDifficulties),
          'heart-of-the-swarm': oneOfStr(campaignDifficulties),
          'legacy-of-the-void': oneOfStr(campaignDifficulties),
        },
      },
    },
  },
  categoryPointProgress: {
    ...arr,
    items: {
      ...obj,
      properties: {
        categoryId: str,
        pointsEarned: num,
      },
    },
  },
  achievementShowcase: {
    ...arr,
    items: num,
  },
  earnedRewards: {
    ...arr,
    items: {
      ...obj,
      properties: {
        rewardId: str,
        selected: bool,
      },
    },
  },
  earnedAchievements: {
    ...arr,
    items: {
      ...obj,
      properties: {
        achievementId: str,
        completionDate: num,
        numCompletedAchievementsInSeries: num,
        totalAchievementsInSeries: num,
        isComplete: bool,
        inProgress: bool,
        criteria: {
          ...arr,
          items: {
            ...obj,
            properties: {
              criterionId: num,
              earned: {
                ...obj,
                properties: {
                  quantity: num,
                  startTime: num,
                },
              },
            },
          },
        },
      },
    },
  },
};

export default {
  response: responseSchema(bnetData),
};
