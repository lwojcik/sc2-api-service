import responseSchema from '../../../schemas/response/index';
import { str, arr, obj, num, bool } from '../../../helpers/schema';

const bnetData = {
  achievements: {
    ...arr,
    items: {
      ...obj,
      properties: {
        categoryId: str,
        chainAchievementIds: {
          ...arr,
          items: str,
        },
        description: str,
        flags: num,
        id: str,
        imageUrl: str,
        isChained: bool,
        points: num,
        title: str,
        uiOrderHing: num,
      },
    },
  },
};

export default {
  response: responseSchema(bnetData),
};
