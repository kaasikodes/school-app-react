import React, { useContext, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import { useNavigate, useParams } from "react-router-dom";
import { IAuthDets } from "../../appTypes/auth";
import { ERole } from "../../appTypes/roles";
import SingleStaffWrapper from "../../components/staff/SingleStaffWrapper";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { openNotification } from "../../helpers/notifications";
import { routes } from "../../routes";

const SingleStaff = () => {
  // use params to pass staff id
  const params = useParams();

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const staffId = `${globalState?.currentSchool?.staffId as string}`;
  const currentSchool = globalState.currentSchool;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentSchool?.currentRole !== ERole.ADMIN) {
      openNotification({
        title: "Access Denied",
        state: "error",
        description: "You are not authorized to view the staff page!",
      });
      navigate(routes.index, { replace: true });
    }
  }, [currentSchool, navigate]);
  return (
    <div>
      {" "}
      <SingleStaffWrapper
        staffId={params.staffId}
        isUser={params.staffId === staffId}
      />
    </div>
  );
};

export default SingleStaff;
