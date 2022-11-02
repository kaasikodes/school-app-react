import React from "react";
import { useParams } from "react-router-dom";
import CoursesWrapper from "../../../../components/courses/CoursesWrapper";

const ClassCourses = () => {
  const params = useParams();
  return (
    <div>
      <CoursesWrapper classId={params.classId} />
    </div>
  );
};

export default ClassCourses;
