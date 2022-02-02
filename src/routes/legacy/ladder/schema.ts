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

const races = ["TERRAN", "ZERG", "PROTOSS", "RANDOM"];

const bnetData = {
  ladderMembers: {
    ...arr,
    items: {
      ...obj,
      properties: {
        character: {
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
        },
        joinTimestamp: num,
        points: num,
        wins: num,
        losses: num,
        highestRank: num,
        previousRank: num,
        favoriteRaceP1: oneOfStr(races),
      },
    },
  },
};

export default {
  response: responseSchema(bnetData),
};
