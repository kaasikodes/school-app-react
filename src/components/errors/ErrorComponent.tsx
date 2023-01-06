import { Typography } from "antd";
import React from "react";

interface IProps {
  message?: string;
}

const ErrorComponent = ({ message = "Oops, an Error Occurred!" }: IProps) => {
  return (
    <div className="h-32 flex justify-center items-center">
      <Typography.Title level={3}>
        <span className="text-red-700">{message}</span>
      </Typography.Title>
    </div>
  );
};

export default ErrorComponent;
