import React, { useContext } from "react";
import { ERole } from "../../appTypes/roles";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import SingleAdminWrapper from "../admin/SingleAdminWrapper";
import SingleCustodianWrapper from "../custodians/SingleCustodianWrapper";
import SingleStaffWrapper from "../staff/SingleStaffWrapper";
import SingleStudentWrapper from "../students/SingleStudentWrapper";

const UserProfileWrapper = () => {
  const globalCtx = useContext(GlobalContext);

  const { state: globalState } = globalCtx;

  // const schoolId = globalState.currentSchool?.id;
  const userRole = globalState.currentSchool?.currentRole;
  const staffId = globalState.currentSchool?.staffId;
  const adminId = globalState.currentSchool?.adminId;
  const studentId = globalState.currentSchool?.studentId;
  const custodianId = globalState.currentSchool?.custodianId;

  return (
    <div>
      {/* name , roles ava to user in current school  */}
      {/* schools accessible to the user */}
      {/* profile photo */}
      {/* Pending Setup if admin (add students, staff, session info, ...., policies)*/}
      {/* Groups you belong to */}
      {/* if admin no of staff, custodians */}
      {/* messages */}
      {/* if staff classes teaching, no students */}
      {/* if custodian sttudents, Previous session reports */}

      {userRole === ERole.STUDENT && (
        <SingleStudentWrapper studentId={studentId} isUser />
      )}
      {userRole === ERole.STAFF && (
        <SingleStaffWrapper staffId={staffId} isUser />
      )}
      {userRole === ERole.ADMIN && (
        <SingleAdminWrapper adminId={adminId} isUser />
      )}
      {userRole === ERole.CUSTODIAN && (
        <>
          {custodianId}ewew
          <SingleCustodianWrapper custodianId={custodianId} isUser />
        </>
      )}
    </div>
  );
};

export default UserProfileWrapper;
