import React from "react";
import { useParams } from "react-router-dom";
import StaffCoursesWrapper from "../../../../components/courses/StaffCoursesWrapper";

const StaffClassCourses = () => {
  const params = useParams();

  return (
    <div>
      <StaffCoursesWrapper classId={params.classId} />
    </div>
  );
};

export default StaffClassCourses;
