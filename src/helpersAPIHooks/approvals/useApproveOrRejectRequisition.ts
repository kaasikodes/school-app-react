import { useMutation } from "react-query";
import { IAuthProps } from "../../helpers/auth";
import axios from "axios";
import useApiAuth from "../../hooks/useApiAuth";
import { TApprovalStatus } from "./useFetchApprovals";

export type TUserType = "admin" | "staff" | "custodian" | "student";
export type TApproveOrRejectProps = {
  status: TApprovalStatus;
  id: number;
};

const approveOrRejectRequest = async (
  props: TApproveOrRejectProps &
    IAuthProps & { schoolId: number; sessionId: number }
) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/approve-or-reject/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = props;

  const response = await axios.post(url, data, config);
  return response;
};
export const useApproveOrRejectRequisition = () => {
  const { token, schoolId, sessionId } = useApiAuth();
  return useMutation((props: TApproveOrRejectProps) =>
    approveOrRejectRequest({ ...props, token, sessionId, schoolId })
  );
};
