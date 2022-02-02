import responseSchema from "../../../schemas/response/index";
import {
  str,
  arr,
  obj,
  oneOfStr,
  oneOfNum,
  num,
} from "../../../helpers/schema";

const regions = [1, 2, 3, 5];

const realms = [1, 2];

const races = ["terran", "zerg", "protoss", "random"];

const bnetData = {
  ladderTeams: {
    ...arr,
    items: {
      ...obj,
      properties: {
        teamMembers: {
          ...arr,
          items: {
            ...obj,
            properties: {
              id: str,
              realm: oneOfNum(realms),
              region: oneOfNum(regions),
              displayName: str,
              clanTag: str,
              favoriteRace: oneOfStr(races),
            },
          },
        },
        previousRank: num,
        points: num,
        wins: num,
        losses: num,
        mmr: num,
        joinTimestamp: num,
      },
    },
  },
};

export default {
  response: responseSchema(bnetData),
};
