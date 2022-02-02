import responseSchema from "../../../schemas/response/index";
import { arr, obj, str, num } from "../../../helpers/schema";

const icon = {
  ...obj,
  properties: {
    x: num,
    y: num,
    w: num,
    h: num,
    offset: num,
    url: str,
  },
};

const reward = {
  ...obj,
  properties: {
    title: str,
    id: str,
    icon,
    achievementId: str,
  },
};

const namedReward = {
  ...obj,
  properties: {
    title: str,
    id: str,
    icon,
    name: str,
    achievementId: str,
  },
};

const bnetData = {
  portraits: {
    ...arr,
    items: reward,
  },
  skins: {
    ...arr,
    items: namedReward,
  },
  animations: {
    ...arr,
    items: namedReward,
  },
};

export default {
  response: responseSchema(bnetData),
};
