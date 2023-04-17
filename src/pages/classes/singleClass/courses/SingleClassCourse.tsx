import React from "react";
import { useParams } from "react-router-dom";
import SingleCourseWrapper from "../../../../components/courses/SingleCourseWrapper";

const SingleClassCourse = () => {
  const params = useParams();

  return (
    <div>
      <SingleCourseWrapper
        classId={params.classId as unknown as string}
        courseId={params.courseId as unknown as string}
      />
    </div>
  );
};

export default SingleClassCourse;
