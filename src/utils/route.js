import { ConstantsPath } from "../constants/ConstantsPath";

// Team users
export const getTeamRoute = (teamId) => {
  return ConstantsPath.TEAM_DETAIL.replace(":team_id", teamId);
};

// Project users
export const getProjectUsersRoute = (projectId) => {
  return ConstantsPath.PROJECT_USER_LIST.replace(":project_id", projectId);
};
