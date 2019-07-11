import responseSchema from '../../../schemas/response/index';
import { arr, obj, str, num } from '../../../helpers/schema';

const bnetData = {
  achievements: {
    ...arr,
    items: {
      ...obj,
      properties: {
        title: str,
        description: str,
        achievementId: str,
        categoryId: str,
        points: num,
        icon: {
          ...obj,
          properties: {
            x: num,
            y: num,
            w: num,
            h: num,
            offset: num,
            url: str,
          },
        },
      },
    },
  },
  categories: {
    ...arr,
    items: {
      ...obj,
      properties: {
        title: str,
        categoryId: str,
        featuredAchievementId: str,
        children: {
          ...arr,
          items: {
            ...obj,
            properties: {
              title: str,
              categoryId: str,
              featuredAchievementId: str,
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
