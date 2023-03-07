import { useParams } from "react-router-dom";
import SingleStudentWrapper from "../../components/students/SingleStudentWrapper";

const SingleStudent = () => {
  // use params to pass staff id
  const params = useParams();
  // restrict to student , custodian , and admin

  return (
    <div>
      {" "}
      <SingleStudentWrapper studentId={params.studentId} />
    </div>
  );
};

export default SingleStudent;
