import axios from "axios";
import { IAuthProps } from "../../helpers/auth";
import { useMutation } from "react-query";
import useApiAuth from "../../hooks/useApiAuth";

interface ICreateProps {
  courseId: number;
  staffId: number;
  levelId: number;
}

export const submitCourseAssesment4Compilation = async ({
  courseId,
  levelId,
  sessionId,
  schoolId,
  staffId,
}: ICreateProps & IAuthProps & { schoolId: number; sessionId: number }) => {
  let url = `${process.env.REACT_APP_APP_URL}/api/courses/submitAssessmentForCompilation`;

  const config = {
    headers: {
      Accept: "application/json",
      // Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    staffId,
    courseId,
    levelId,
    sessionId,
    schoolId,
  };
  const response = await axios.post(url, data, config);
  return response;
};

export const useSubmitCourseAssesment4Compilation = () => {
  const { token, schoolId, sessionId } = useApiAuth();
  return useMutation((props: ICreateProps) =>
    submitCourseAssesment4Compilation({ ...props, token, sessionId, schoolId })
  );
};
