import React from "react";
import { useParams } from "react-router-dom";
import StudentCourseWrapper from "../../components/students/singleStudent/StudentCourseWrapper";

const SingleStudentCourse = () => {
  const params = useParams();
  const courseId = params.courseId;
  const classId = params.classId;
  const studentId = params.studentId;

  return (
    <div>
      <StudentCourseWrapper
        classId={classId as string}
        courseId={courseId as string}
        studentId={studentId as string}
      />
    </div>
  );
};

export default SingleStudentCourse;
