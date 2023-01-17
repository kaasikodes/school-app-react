import { Typography } from "antd";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ERole } from "../appTypes/roles";
import CoursesWrapper from "../components/courses/CoursesWrapper";
import StaffClassesAndCourses from "../components/staff/singleStaff/StaffClassesAndCourses";
import { GlobalContext } from "../contexts/GlobalContextProvider";
import { openNotification } from "../helpers/notifications";
import { routes } from "../routes";

const Courses = () => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const currentSchool = globalState.currentSchool;
  const staffId = globalState.currentSchool?.staffId as string;
  const navigate = useNavigate();
  const canAccessPage =
    currentSchool?.currentRole === ERole.ADMIN ||
    currentSchool?.currentRole === ERole.STAFF;

  useEffect(() => {
    if (!canAccessPage) {
      openNotification({
        title: "Access Denied",
        state: "error",
        description: "You are not authorized to view the courses page!",
      });
      navigate(routes.index, { replace: true });
    }
  }, [canAccessPage, navigate]);
  return (
    <div>
      {currentSchool?.currentRole === ERole.ADMIN && <CoursesWrapper />}
      {currentSchool?.currentRole === ERole.STAFF && (
        <>
          <Typography.Title level={3}>My Courses</Typography.Title>
          <StaffClassesAndCourses
            staffId={staffId}
            show="coursesGroupedByLevel"
          />
        </>
      )}
    </div>
  );
};

export default Courses;
