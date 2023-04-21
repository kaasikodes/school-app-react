import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ERole } from "../appTypes/roles";
import { GlobalContext } from "../contexts/GlobalContextProvider";
import { openNotification } from "../helpers/notifications";
import { routes } from "../routes";

import { InvitationWrapper } from "../components/invitations/InvitationWrapper";

const InviteUsers = () => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const currentSchool = globalState.currentSchool;

  const navigate = useNavigate();
  const canAccessPage = currentSchool?.currentRole === ERole.ADMIN;

  useEffect(() => {
    if (!canAccessPage) {
      openNotification({
        title: "Access Denied",
        state: "error",
        description: "You are not authorized to view the settings page!",
      });
      navigate(routes.index, { replace: true });
    }
  }, [canAccessPage, navigate]);
  return (
    <div>
      {currentSchool?.currentRole === ERole.ADMIN && <InvitationWrapper />}
    </div>
  );
};

export default InviteUsers;
