import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ERole } from "../appTypes/roles";
import CoursesWrapper from "../components/courses/CoursesWrapper";
import { GlobalContext } from "../contexts/GlobalContextProvider";
import { openNotification } from "../helpers/notifications";
import { routes } from "../routes";

const Courses = () => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const currentSchool = globalState.currentSchool;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentSchool?.currentRole !== ERole.ADMIN) {
      openNotification({
        title: "Access Denied",
        state: "error",
        description: "You are not authorized to view the courses page!",
      });
      navigate(routes.index, { replace: true });
    }
  }, [currentSchool, navigate]);
  return (
    <div>
      <CoursesWrapper />
    </div>
  );
};

export default Courses;
