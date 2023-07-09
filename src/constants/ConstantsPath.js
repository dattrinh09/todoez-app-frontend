export const ConstantsPath = {
  /* Public page */
  HERO_PAGE: "/wellcome",
  // Auth
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  SUCCESS: "/auth/success",
  VERIFY_EMAIL: "/auth/verify-email",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  /* Private page */
  MY_PAGE: "/",
  // User
  PROFILE: "/profile",
  USER_PROFILE: "/user/:user_id",
  // My Task
  MY_TASK: "/my-task",
  // Project
  PROJECT_LIST: "/project",
  PROJECT_SPRINT_LIST: "/project/:project_id/sprint",
  PROJECT_TASK_LIST: "/project/:project_id/task",
  PROJECT_TASK_DETAIL: "/project/:project_id/task/:task_id",
  PROJECT_USER_LIST: "/project/:project_id/user",
  // Team:
  TEAM_LIST: "/team",
  TEAM_NOTE_LIST: "/team/:team_id/note",
  TEAM_USER_LIST: "/team/:team_id/user",
};
