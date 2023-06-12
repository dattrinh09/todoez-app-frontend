import { ConstantsPath } from "@/constants/ConstantsPath";

// Team users
export const getTeamRoute = (teamId) => {
  return ConstantsPath.TEAM_DETAIL.replace(":team_id", teamId);
};

// Project detail
export const getProjectDetailRoute = (projectId) => {
  return ConstantsPath.PROJECT_DETAIL.replace(":project_id", projectId);
};

// Sprint list
export const getSprintListlRoute = (projectId) => {
  return ConstantsPath.PROJECT_SPRINT_LIST.replace(":project_id", projectId);
};

// Project users list
export const getProjectUsersRoute = (projectId) => {
  return ConstantsPath.PROJECT_USER_LIST.replace(":project_id", projectId);
};

// Task list
export const getTaskListRoute = (projectId) => {
  return ConstantsPath.PROJECT_TASK_LIST.replace(":project_id", projectId);
};

// Task detail
export const getTaskDetailRoute = (projectId, taskId) => {
  return ConstantsPath.PROJECT_TASK_DETAIL.replace(
    ":project_id",
    projectId
  ).replace(":task_id", taskId);
};
