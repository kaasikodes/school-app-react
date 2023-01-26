import React from "react";
import { useParams } from "react-router-dom";
import SingleCustodianWrapper from "../../components/custodians/SingleCustodianWrapper";

const SingleCustodian = () => {
  const params = useParams();

  return (
    <div>
      <SingleCustodianWrapper custodianId={params.custodianId} />
    </div>
  );
};

export default SingleCustodian;
