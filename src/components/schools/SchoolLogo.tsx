import { Avatar } from "antd";
import React from "react";

const SchoolLogo: React.FC<{ schoolId: number; defaultSrc?: string }> = ({
  defaultSrc,
  schoolId,
}) => {
  // TO DO: This needs to make API Call so as to up 2 date react query key invalidation on logo update
  return (
    <Avatar
      src={defaultSrc}
      size={45}
      // className="border-white border-2"
    />
  );
};

export default SchoolLogo;
