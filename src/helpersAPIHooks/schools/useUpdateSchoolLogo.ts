import { useMutation } from "react-query";
import { IAuthProps } from "../../helpers/auth";
import axios from "axios";
import useApiAuth from "../../hooks/useApiAuth";

export type TUpdateSchoolLogoProps = {
  photo: string;
  schoolId: number;
};

const updateLogo = async (props: TUpdateSchoolLogoProps & IAuthProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/schools/${props.schoolId}/updateLogo`;
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
export const useUpdateSchoolLogo = () => {
  const { token } = useApiAuth();
  return useMutation((props: TUpdateSchoolLogoProps) =>
    updateLogo({ ...props, token })
  );
};
