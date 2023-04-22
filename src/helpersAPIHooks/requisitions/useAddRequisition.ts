import { useMutation } from "react-query";
import { IAuthProps } from "../../helpers/auth";
import axios from "axios";
import useApiAuth from "../../hooks/useApiAuth";
import { TRequistionType } from "../../components/courses/SubmitCourseAssessment4Compilation";

export type TMakeRequestProps = {
  content: string;
  title: string;
  type: TRequistionType;
};

const addRequest = async (
  props: TMakeRequestProps &
    IAuthProps & { schoolId: number; sessionId: number }
) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/requisitions/create`;
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
export const useAddRequisition = () => {
  const { token, schoolId, sessionId } = useApiAuth();
  return useMutation((props: TMakeRequestProps) =>
    addRequest({ ...props, token, sessionId, schoolId })
  );
};
