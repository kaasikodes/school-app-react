import { Typography } from "antd";
import React from "react";

interface IProps {
  releaseDate?: string;
}

const ComingSoon = ({ releaseDate = "4th of March, 2022" }: IProps) => {
  return (
    <div className="h-32 flex justify-center items-center">
      <Typography.Title level={3}>
        <span className="text-green-700">
          Please be patient this feature will be released on the {releaseDate}
        </span>
      </Typography.Title>
    </div>
  );
};

export default ComingSoon;
