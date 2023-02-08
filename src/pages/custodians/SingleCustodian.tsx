import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ERole } from "../../appTypes/roles";
import SingleCustodianWrapper from "../../components/custodians/SingleCustodianWrapper";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { openNotification } from "../../helpers/notifications";
import { routes } from "../../routes";

const SingleCustodian = () => {
  const params = useParams();
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const custodianId = `${globalState?.currentSchool?.custodianId as string}`;
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
      <SingleCustodianWrapper
        custodianId={params.custodianId}
        isUser={params.custodianId === custodianId}
      />
    </div>
  );
};

export default SingleCustodian;
