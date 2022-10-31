import { Spin } from "antd";
import React from "react";

const ComponentLoader = () => {
  return (
    <div className="h-72 w-full flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
};

export default ComponentLoader;
