import { notificationShow } from "./notificationShow";

export const errorResponse = (response) => {
  const status = response.status;
  const message = response.data.message;

  switch (status) {
    case 401:
      notificationShow("error", message);
      break;
    case 400:
      notificationShow("error", message);
      break;
    case 403:
      notificationShow("error", "You need to sign in");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      break;
    case 404:
      notificationShow("error", "Api not found");
      break;
    case 500:
      notificationShow("error", "Server error");
      break;
    default:
      notificationShow("error", "Something error");
      break;
  }
};
