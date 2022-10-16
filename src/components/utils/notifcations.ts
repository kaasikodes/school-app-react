import { notification } from "antd";
import { ReactNode } from "react";

const NOTIFICATION_KEY = "general notification";

export const openNotification = ({
  title,
  description,
  state,
  duration,
}: {
  title: string;
  description: string | ReactNode;
  state?: "open" | "success" | "error" | "info";
  duration?: number;
}) => {
  notification[state ?? "open"]({
    key: NOTIFICATION_KEY,
    message: title,
    description,
    duration: duration ?? 0,
    onClick: () => {},
  });
};
