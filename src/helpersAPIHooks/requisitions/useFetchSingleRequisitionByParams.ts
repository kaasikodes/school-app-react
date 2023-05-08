import axios from "axios";
import { IAuthProps } from "../../helpers/auth";
import useApiAuth from "../../hooks/useApiAuth";
import { useQuery } from "react-query";
import { TRequisition } from "./useFetchRequisitions";

export type TRequistionType =
  | "course_result_compilation"
  | "level_result_compilation"
  | "other";

export interface IGetRequisitionProps {
  courseId?: number;
  levelId?: number;
  type?: TRequistionType;
}
export const QUERY_KEY_FOR_SINGLE_REQUISITION_BY_PARAMS =
  "single-requisition-by-params";
export const getRequisitionByParams = async ({
  token,
  sessionId,
  courseId,
  levelId,
  type,
}: IGetRequisitionProps &
  IAuthProps & {
    schoolId: number;
    sessionId: number;
  }): Promise<TRequisition> => {
  let url = `${process.env.REACT_APP_APP_URL}/api/single-requisition-by-params`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      sessionId,
      courseId,
      levelId,
      type,
    },
  };

  const res: any = await axios.get(url, config);
  const fetchedData = res.data.data;
  const data: TRequisition = fetchedData;

  return data;
};

export const useFetchSingleRequisitionByParams = (
  props: IGetRequisitionProps
) => {
  const { token, sessionId, schoolId } = useApiAuth();
  const { courseId, levelId, type } = props;
  // as per user Type and as per session
  return useQuery(
    [QUERY_KEY_FOR_SINGLE_REQUISITION_BY_PARAMS, courseId, levelId, type],
    () =>
      getRequisitionByParams({
        ...props,
        schoolId,
        sessionId,
        token,
        courseId,
        levelId,
        type,
      })
  );
};
