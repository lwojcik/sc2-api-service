import responseSchema from '../../../schemas/response/index';
import {
  str,
  arr,
  obj,
  oneOfNum,
  num,
} from '../../../helpers/schema';

const queueIds = [
  1, // WoL 1v1
  2, // WoL 2v2
  3, // WoL 3v3
  4, // WoL 4v4
  101, // HotS 1v1
  102, // HotS 2v2
  103, // HotS 3v3
  104, // HotS 4v4
  201, // LotV 1v1
  202, // LotV 2v2
  203, // LotV 3v3
  204, // LotV 4v4
  206, // LotV Archon
];

const teamTypes = [
  0, // arranged,
  1, // random,
];

const leagueIds = [
  0, // Bronze
  1, // Silver
  2, // Gold
  3, // Platinum
  4, // Diamond
  5, // Master
  6, // Grandmaster
];

const bnetData = {
  _links: {
    ...obj,
    properties: {
      self: {
        ...obj,
        properties: {
          href: str,
        },
      },
    },
  },
  key: {
    ...obj,
    properties: {
      league_id: oneOfNum(leagueIds),
      season_id: num,
      queue_id: oneOfNum(queueIds),
      team_type: oneOfNum(teamTypes),
    },
  },
  tier: {
    ...arr,
    items: {
      ...obj,
      properties: {
        id: num,
        min_rating: num,
        max_rating: num,
        division: {
          ...arr,
          items: {
            ...obj,
            properties: {
              id: num,
              ladder_id: num,
              member_count: num,
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
