import React from "react";
import { useParams } from "react-router-dom";
import StudentCourseOverview from "../../components/students/singleStudent/StudentCourseOverview";

const SingleStudentCourse = () => {
  const params = useParams();
  const courseId = params.courseId;
  const classId = params.classId;
  const studentId = params.studentId;

  return (
    <div>
      <StudentCourseOverview
        classId={classId as string}
        courseId={courseId as string}
        studentId={studentId as string}
      />
    </div>
  );
};

export default SingleStudentCourse;
