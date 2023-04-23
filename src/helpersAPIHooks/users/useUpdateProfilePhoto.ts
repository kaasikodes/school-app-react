import { useMutation } from "react-query";
import { IAuthProps } from "../../helpers/auth";
import axios from "axios";
import useApiAuth from "../../hooks/useApiAuth";

export type TUpdatePhotoProps = {
  photo: string;
  userId: number;
};

const updatePhoto = async (
  props: TUpdatePhotoProps &
    IAuthProps & { schoolId: number; sessionId: number }
) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/users/${props.userId}/updateProfilePhoto`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = props;

  const response = await axios.patch(url, data, config);
  return response;
};
export const useUpdateProfilePhoto = () => {
  const { token, schoolId, sessionId } = useApiAuth();
  return useMutation((props: TUpdatePhotoProps) =>
    updatePhoto({ ...props, token, sessionId, schoolId })
  );
};
