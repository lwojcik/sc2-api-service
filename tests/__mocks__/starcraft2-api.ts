class StarCraft2API {
  // eslint-disable-next-line class-methods-use-this
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

  // eslint-disable-next-line class-methods-use-this
  querySeason(): Promise<object> {
    return Promise.resolve({
      seasonId: 9999,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  queryLegacyAchievements(): Promise<object> {
    return Promise.resolve({
      achievements: [
        {
          title: 'sample legacy achievement',
        },
      ],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  queryLegacyRewards(): Promise<object> {
    return Promise.resolve({
      portraits: [
        {
          title: 'sample legacy reward',
        },
      ],
    });
  }

  // eslint-disable-next-line class-methods-use-this
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

  // eslint-disable-next-line class-methods-use-this
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

  // eslint-disable-next-line class-methods-use-this
  queryLegacyMatchHistory(): Promise<object> {
    return Promise.resolve({
      matches: [
        {
          map: 'sample legacy match history object',
        },
      ],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  queryLegacyProfile(): Promise<object> {
    return Promise.resolve({
      displayName: 'sample legacy profile object',
    });
  }

  // eslint-disable-next-line class-methods-use-this
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

  // eslint-disable-next-line class-methods-use-this
  queryProfileMetadata(): Promise<object> {
    return Promise.resolve({
      name: 'sample profile metadata object',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  queryLadderSummary(): Promise<object> {
    return Promise.resolve({
      showCaseEntries: [
        {
          ladderId: 'sample ladder summary object',
        },
      ],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  queryStaticProfileData(): Promise<object> {
    return Promise.resolve({
      achievements: [
        {
          description: 'sample static profile data object',
        },
      ],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  queryProfile(): Promise<object> {
    return Promise.resolve({
      summary: {
        displayName: 'sample profile object',
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
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
