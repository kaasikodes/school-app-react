import React from "react";

interface IProps {
  studentId?: string;
  isUser?: boolean;
  classId: string;
  courseId: string;
}

const StudentCourseOverview = ({ studentId }: IProps) => {
  return <div>{studentId ? <div>Comp</div> : "not found"}</div>;
};

export default StudentCourseOverview;
