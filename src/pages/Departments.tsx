import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ERole } from "../appTypes/roles";
import DepartmentsWrapper from "../components/departments/DepartmentsWrapper";
import { GlobalContext } from "../contexts/GlobalContextProvider";
import { openNotification } from "../helpers/notifications";

const Departments = () => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;

  const currentSchool = globalState.currentSchool;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentSchool?.currentRole !== ERole.ADMIN) {
      openNotification({
        title: "Access Denied",
        state: "error",
        description: "You are not authorized to view the departments page!",
      });
      navigate(-1);
    }
  }, [currentSchool, navigate]);
  return (
    <div>
      <DepartmentsWrapper />
    </div>
  );
};

export default Departments;
