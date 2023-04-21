import { useMutation } from "react-query";
import { IAuthProps } from "../../helpers/auth";
import axios from "axios";
import useApiAuth from "../../hooks/useApiAuth";

export type TUserType = "admin" | "staff" | "custodian" | "student";
export type TCreateInviteProps = {
  email: string;
  userType: TUserType;
};

const createInvitation = async (
  props: TCreateInviteProps &
    IAuthProps & { schoolId: number; sessionId: number }
) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/invites/create`;
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
export const useCreateSingleInvitation = () => {
  const { token, schoolId, sessionId } = useApiAuth();
  return useMutation((props: TCreateInviteProps) =>
    createInvitation({ ...props, token, sessionId, schoolId })
  );
};

export default useCreateSingleInvitation;
