import React from "react";
import { useParams } from "react-router-dom";
import SingleClassWrapper from "../../../components/classes/SingleClassWrapper";

const SingleClass = () => {
  let params = useParams();
  return (
    <div>
      <SingleClassWrapper classId={params.classId} />
    </div>
  );
};

export default SingleClass;
