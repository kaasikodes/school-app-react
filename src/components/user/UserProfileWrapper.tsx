import React, { useContext } from "react";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { ERole } from "../../appTypes/roles";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import SingleAdminWrapper from "../admin/SingleAdminWrapper";
import Profile from "../staff/singleStaff/Profile";
import SingleStaffWrapper from "../staff/SingleStaffWrapper";

const UserProfileWrapper = () => {
  const globalCtx = useContext(GlobalContext);

  const { state: globalState } = globalCtx;

  // const schoolId = globalState.currentSchool?.id;
  const userRole = globalState.currentSchool?.currentRole;
  const staffId = globalState.currentSchool?.staffId;
  const adminId = globalState.currentSchool?.adminId;

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
      {userRole === ERole.STAFF && (
        <SingleStaffWrapper staffId={staffId} isUser />
      )}
      {userRole === ERole.ADMIN && (
        <SingleAdminWrapper adminId={adminId} isUser />
      )}
    </div>
  );
};

export default UserProfileWrapper;
