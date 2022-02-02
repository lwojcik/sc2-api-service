import responseSchema from "../../../schemas/response/index";
import { num, str } from "../../../helpers/schema";

const bnetData = {
  seasonId: num,
  number: num,
  year: num,
  startDate: str,
  endDate: str,
};

export default {
  response: responseSchema(bnetData),
};
