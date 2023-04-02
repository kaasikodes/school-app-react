import { useMutation } from "react-query";
import { IAuthProps } from "../../helpers/auth";
import axios from "axios";

type TUserType = "admin" | "staff" | "custodian" | "student";
type TCreateProps = {
  email: string;
  userType: TUserType;
};

const createInvitation = async (
  props: TCreateProps & IAuthProps & { schoolId: number; sessionId: number }
) => {
  const url = `${process.env.REACT_APP_APP_URL}/invitations/create`;
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
  return useMutation(createInvitation);
};

export default useCreateSingleInvitation;
