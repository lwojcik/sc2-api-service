export const StarCraft2API = jest.fn().mockImplementation(() => ({
  queryGrandmasterLeaderboard: () => Promise.resolve({
    ladderTeams: [
      {
        teamMembers: [
          {
            displayName: 'sample grandmaster leaderboard object',
          },
        ],
      },
    ],
  }),

  querySeason: () => Promise.resolve({
    seasonId: 9999,
  }),

  queryLegacyAchievements: () => Promise.resolve({
    achievements: [
      {
        title: 'sample legacy achievement',
      },
    ],
  }),

  queryLegacyRewards: () => Promise.resolve({
    portraits: [
      {
        title: 'sample legacy reward',
      },
    ],
  }),

  queryLegacyLadder: () => Promise.resolve({
    ladderMembers: [
      {
        character: {
          displayName: 'sample legacy ladder object',
        },
      },
    ],
  }),

  queryLegacyLadders: () => Promise.resolve({
    currentSeason: [
      {
        ladder: [
          {
            ladderName: 'sample legacy ladders object',
          },
        ],
      },
    ],
  }),

  queryLegacyMatchHistory: () => Promise.resolve({
    matches: [
      {
        map: 'sample legacy match history object',
      },
    ],
  }),

  queryLegacyProfile: () => Promise.resolve({
    displayName: 'sample legacy profile object',
  }),

  queryPlayerLadder: () => Promise.resolve({
    ladderTeams: [
      {
        teamMembers: [
          {
            displayName: 'sample ladder object',
          },
        ],
      },
    ],
  }),

  queryProfileMetadata: () => Promise.resolve({
    name: 'sample profile metadata object',
  }),

  queryLadderSummary: () => Promise.resolve({
    showCaseEntries: [
      {
        ladderId: 'sample ladder summary object',
      },
    ],
  }),

  queryStaticProfileData: () => Promise.resolve({
    achievements: [
      {
        description: 'sample static profile data object',
      },
    ],
  }),

  queryProfile: () => Promise.resolve({
    summary: {
      displayName: 'sample profile object',
    },
  }),

  queryLeagueData: () => Promise.resolve({
    _links: {
      self: {
        href: 'sample league object',
      },
    },
  }),
}));
