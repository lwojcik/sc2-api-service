import { num, obj } from '../../helpers/schema';
import error from './error';

const responseSchema = (res: object) => ({
  200: {
    ...obj,
    properties: {
      status: num,
      data: {
        ...obj,
        properties: res,
      },
    },
  },
  400: error,
  500: error,
});

export default responseSchema;
