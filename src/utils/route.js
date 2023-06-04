import { ConstantsPath } from "../constants/ConstantsPath";

// Team users
export const getTeamRoute = (teamId) => {
  return ConstantsPath.TEAM_DETAIL.replace(":team_id", teamId);
};

// Project users
export const getProjectUsersRoute = (projectId) => {
  return ConstantsPath.PROJECT_USER_LIST.replace(":project_id", projectId);
};

// Task detail
export const getTaskDetailRoute = (projectId, taskId) => {
  return ConstantsPath.PROJECT_TASK_DETAIL
    .replace(":project_id",projectId)
    .replace(":task_id", taskId);
};
