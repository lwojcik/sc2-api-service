import { obj, num, str } from '../../helpers/schema';
import error from '../../schemas/response/error';

const schema = {
  response: {
    200: {
      ...obj,
      properties: {
        status: num,
        message: str,
      },
    },
    400: error,
    500: error,
  },
};

export default schema;
