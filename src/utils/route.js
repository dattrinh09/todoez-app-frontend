import { ConstantsPath } from "@/constants/ConstantsPath";

// Note list
export const getNoteListRoute = (teamId) => {
  return ConstantsPath.TEAM_NOTE_LIST.replace(":team_id", teamId);
};

// Team users list
export const getTeamUsersRoute = (teamId) => {
  return ConstantsPath.TEAM_USER_LIST.replace(":team_id", teamId);
};

// Sprint list
export const getSprintListRoute = (projectId) => {
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

// User profile
export const getUserProfileRoute = (userId) => {
  return ConstantsPath.USER_PROFILE.replace(":user_id", userId);
};
