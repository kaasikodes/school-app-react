import { Typography } from "antd";
import React from "react";

const OfflineComponent = () => {
  return (
    <div className="h-32 flex justify-center items-center">
      <Typography.Title level={3}>
        <span className="text-red-700">You're offline!</span>
      </Typography.Title>
    </div>
  );
};

export default OfflineComponent;
