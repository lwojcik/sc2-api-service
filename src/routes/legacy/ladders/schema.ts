import responseSchema from "../../../schemas/response/index";
import {
  arr,
  obj,
  str,
  num,
  oneOfStr,
  bool,
  oneOfNum,
} from "../../../helpers/schema";

const regions = [1, 2, 3, 5];

const realms = [1, 2];

const ranks = [
  "BRONZE",
  "SILVER",
  "GOLD",
  "PLATINUM",
  "DIAMOND",
  "MASTER",
  "GRANDMASTER",
];

const matchMakingQueues = [
  "LOTV_SOLO",
  "LOTV_TWOS",
  "LOTV_TWOS_COMP",
  "LOTV_THREES",
  "LOTV_FOURS",
];

const ladder = {
  ...obj,
  properties: {
    ladderName: str,
    ladderId: str,
    division: num,
    rank: num,
    league: oneOfStr(ranks),
    matchMakingQueue: oneOfStr(matchMakingQueues),
    wins: num,
    losses: num,
    showcase: bool,
  },
};

const character = {
  ...obj,
  properties: {
    id: str,
    realm: oneOfNum(realms),
    region: oneOfNum(regions),
    displayName: str,
    clanName: str,
    clanTag: str,
    profilePath: str,
  },
};

const season = {
  ...arr,
  items: {
    ...obj,
    properties: {
      ladder: {
        ...arr,
        items: ladder,
      },
      characters: {
        ...arr,
        items: character,
      },
      nonRanked: {
        ...arr,
        items: {
          ...obj,
          properties: {
            mmq: oneOfStr(matchMakingQueues),
            gamesPlayed: num,
          },
        },
      },
    },
  },
};

const bnetData = {
  currentSeason: season,
  previousSeason: season,
  showcasePlacement: season,
};

export default {
  response: responseSchema(bnetData),
};
