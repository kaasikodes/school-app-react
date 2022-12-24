import { Spin } from "antd";
import React from "react";

import BarLoader from "react-spinners/BarLoader";

const ComponentLoader = () => {
  return (
    <div className="h-72 w-full flex justify-center items-center">
      <BarLoader color="#0080FE" />
    </div>
  );
};

export default ComponentLoader;
