import responseSchema from '../../../schemas/response/index';
import { arr, obj, str, num, oneOfStr } from '../../../helpers/schema';

const types = ['Custom', '1v1', '2v2', '3v3', '4v4'];

const decisions = ['Win', 'Loss', 'Draw'];

const speeds = ['Slower', 'Slow', 'Normal', 'Fast', 'Faster'];

const bnetData = {
  matches: {
    ...arr,
    items: {
      ...obj,
      properties: {
        map: str,
        type: oneOfStr(types),
        decision: oneOfStr(decisions),
        speed: oneOfStr(speeds),
        date: num,
      },
    },
  },
};

export default {
  response: responseSchema(bnetData),
};
