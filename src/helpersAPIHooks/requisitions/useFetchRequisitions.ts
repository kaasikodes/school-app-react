import axios from "axios";
import { IPaginationProps } from "../../appTypes/requestParams";
import { IAuthProps } from "../../helpers/auth";
import useApiAuth from "../../hooks/useApiAuth";
import { useQuery } from "react-query";
import { TRequistionType } from "./useFetchSingleRequisitionByParams";

export const QUERY_KEY_FOR_REQUISITIONS = "requisitions";

export type TRequisitionStatus = "pending" | "rejected" | "approved";

export interface IGetRequisitionProps {
  searchTerm?: string;
  pagination?: IPaginationProps;
  type?: TRequistionType;
  status?: TRequisitionStatus;
}

export interface TRequisition {
  id: number;
  requester_id: number;
  requested_as: string;
  current_approver_id: number;
  current_stage_id?: string;
  level_id: number;
  course_id: number;
  status: string;
  type: string;
  content: string;
  title: string;
  school_id: number;
  session_id: number;
  created_at: string;
  updated_at: string;
  requester: User;
  current_approver: User;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  email_verified_at?: string;
  gender: string;
  two_factor_confirmed_at?: string;
  current_team_id?: string;
  profile_photo_path?: string;
  created_at: string;
  updated_at: string;
  choosen_school_id: number;
  profile_photo_url: string;
}

export const getAllRequisitions = async ({
  token,
  schoolId,
  searchTerm,
  pagination,
  sessionId,
  type,
  status,
}: IGetRequisitionProps &
  IAuthProps & { schoolId: number; sessionId: number }): Promise<{
  data: TRequisition[];
  total: number;
}> => {
  let url = `${process.env.REACT_APP_APP_URL}/api/requisitions/${schoolId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit: pagination?.limit,
      page: pagination?.page,
      searchTerm,
      sessionId,
      type,
      status,
    },
  };

  const res: any = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData;

  const data: TRequisition[] = result.map(
    (item: TRequisition): TRequisition => ({
      ...item,
    })
  );

  return {
    data,
    total: res.data?.meta.total,
  };
};

export const useFetchRequisitions = (props: IGetRequisitionProps) => {
  const { token, sessionId, schoolId } = useApiAuth();
  // as per user Type and as per session
  return useQuery(
    [
      QUERY_KEY_FOR_REQUISITIONS,
      props.type,
      props.status,
      props.pagination,
      props.searchTerm,
    ],
    () => getAllRequisitions({ ...props, schoolId, sessionId, token })
  );
};
