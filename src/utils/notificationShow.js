import { notification } from "antd";

export function notificationShow(type, message, description) {
  notification.open({
    message,
    description,
    type,
    placement: "top",
    duration: 5,
  });
}
