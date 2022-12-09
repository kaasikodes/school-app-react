import React from "react";
import { useParams } from "react-router-dom";
import SingleStaffWrapper from "../../components/staff/SingleStaffWrapper";

const SingleStaff = () => {
  // use params to pass staff id
  const params = useParams();

  return (
    <div>
      {" "}
      <SingleStaffWrapper staffId={params.staffId} />
    </div>
  );
};

export default SingleStaff;
