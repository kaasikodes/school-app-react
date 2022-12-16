import React from "react";
import { useParams } from "react-router-dom";
import SingleStudentWrapper from "../../components/students/SingleStudentWrapper";

const SingleStudent = () => {
  // use params to pass staff id
  const params = useParams();

  return (
    <div>
      {" "}
      <SingleStudentWrapper studentId={params.studentId} />
    </div>
  );
};

export default SingleStudent;
