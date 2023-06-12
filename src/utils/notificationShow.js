import { notification } from "antd";

export function notificationShow(type, message) {
  notification.open({
    type,
    message,
    placement: "top",
    duration: 3,
  });
}
