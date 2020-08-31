class StarCraft2API {
  constructor() {}

  queryGrandmasterLeaderboard(): Promise<object> {
    return Promise.resolve({
      ladderTeams: [
        {
          teamMembers: [
            {
              displayName: 'sample grandmaster leaderboard object',
            },
          ],
        },
      ],
    });
  }

  querySeason(): Promise<object> {
    return Promise.resolve({
      seasonId: 9999,
    });
  }

  queryLegacyAchievements(): Promise<object> {
    return Promise.resolve({
      achievements: [
        {
          title: 'sample legacy achievement',
        },
      ],
    });
  }

  queryLegacyRewards(): Promise<object> {
    return Promise.resolve({
      portraits: [
        {
          title: 'sample legacy reward',
        },
      ],
    });
  }

  queryLegacyLadder(): Promise<object> {
    return Promise.resolve({
      ladderMembers: [
        {
          character: {
            displayName: 'sample legacy ladder object',
          },
        },
      ],
    });
  }

  queryLegacyLadders(): Promise<object> {
    return Promise.resolve({
      currentSeason: [
        {
          ladder: [
            {
              ladderName: 'sample legacy ladders object',
            },
          ],
        },
      ],
    });
  }

  queryLegacyMatchHistory(): Promise<object> {
    return Promise.resolve({
      matches: [
        {
          map: 'sample legacy match history object',
        },
      ],
    });
  }

  queryLegacyProfile(): Promise<object> {
    return Promise.resolve({
      displayName: 'sample legacy profile object',
    });
  }

  queryPlayerLadder(): Promise<object> {
    return Promise.resolve({
      ladderTeams: [
        {
          teamMembers: [
            {
              displayName: 'sample ladder object',
            },
          ],
        },
      ],
    });
  }

  queryProfileMetadata(): Promise<object> {
    return Promise.resolve({
      name: 'sample profile metadata object',
    });
  }

  queryLadderSummary(): Promise<object> {
    return Promise.resolve({
      showCaseEntries: [
        {
          ladderId: 'sample ladder summary object',
        },
      ],
    });
  }

  queryStaticProfileData(): Promise<object> {
    return Promise.resolve({
      achievements: [
        {
          description: 'sample static profile data object',
        },
      ],
    });
  }

  queryProfile(): Promise<object> {
    return Promise.resolve({
      summary: {
        displayName: 'sample profile object',
      },
    });
  }

  queryLeagueData(): Promise<object> {
    return Promise.resolve({
      _links: {
        self: {
          href: 'sample league object',
        },
      },
    });
  }
}

export default StarCraft2API;
