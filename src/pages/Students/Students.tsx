import { Typography } from "antd";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ERole } from "../../appTypes/roles";
import CustodianWardsTable from "../../components/custodians/CustodianWardsTable";
import StudentsWrapper from "../../components/students/StudentsWrapper";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { openNotification } from "../../helpers/notifications";
import { routes } from "../../routes";

const Students = () => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const currentSchool = globalState.currentSchool;
  const custodianId = globalState.currentSchool?.custodianId as string;
  const navigate = useNavigate();
  const canAccessPage =
    currentSchool?.currentRole === ERole.ADMIN ||
    currentSchool?.currentRole === ERole.CUSTODIAN;

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
      {currentSchool?.currentRole === ERole.ADMIN && <StudentsWrapper />}
      {currentSchool?.currentRole === ERole.CUSTODIAN && (
        <>
          <Typography.Title level={3}>My Wards</Typography.Title>
          <div className="mt-8">
            <CustodianWardsTable custodianId={custodianId as string} />
          </div>
        </>
      )}
    </div>
  );
};

export default Students;
