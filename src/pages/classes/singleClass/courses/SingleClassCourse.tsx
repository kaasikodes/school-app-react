import React from "react";
import { useParams } from "react-router-dom";
import SingleCourseWrapper from "../../../../components/courses/SingleCourseWrapper";

const SingleClassCourse = () => {
  const params = useParams();

  return (
    <div>
      <SingleCourseWrapper
        classId={params.classId}
        courseId={params.courseId}
      />
    </div>
  );
};

export default SingleClassCourse;
