import { useParams } from "react-router-dom";
import StaffCoursesForASingleClassWrapper from "../../components/staff/singleStaff/StaffCoursesForASingleClassWrapper";

const StaffClassCourses = () => {
  const params = useParams();

  return (
    <div>
      <StaffCoursesForASingleClassWrapper
        classId={params.classId}
        staffId={params.staffId}
      />
    </div>
  );
};

export default StaffClassCourses;
