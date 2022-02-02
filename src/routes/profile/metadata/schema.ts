import responseSchema from "../../../schemas/response/index";
import { str, num } from "../../../helpers/schema";

const bnetData = {
  name: str,
  profileUrl: str,
  avatarUrl: str,
  profileId: str,
  regionId: num,
  realmId: num,
};

export default {
  response: responseSchema(bnetData),
};
