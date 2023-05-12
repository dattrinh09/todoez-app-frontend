import { ConstantsPath } from "../constants/ConstantsPath";

export const getTeamRoute = (id) => {
  return ConstantsPath.TEAM_DETAIL.replace(":team_id", id);
};
