import React from "react";

interface IProps {
  studentId?: string;
  isUser?: boolean;
  classId: string;
  courseId: string;
}

const StudentCourseWrapper = ({ studentId }: IProps) => {
  return <div>{studentId ? <div>Comp</div> : "not found"}</div>;
};

export default StudentCourseWrapper;
