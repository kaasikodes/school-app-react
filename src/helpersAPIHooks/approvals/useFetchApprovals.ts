import axios from "axios";
import { IPaginationProps } from "../../appTypes/requestParams";
import { IAuthProps } from "../../helpers/auth";
import useApiAuth from "../../hooks/useApiAuth";
import { useQuery } from "react-query";
import { TRequistionType } from "helpersAPIHooks/requisitions/useFetchSingleRequisitionByParams";

export type TApprovalStatus = "pending" | "rejected" | "approved";

export interface IGetApprovalsProps {
  searchTerm?: string;
  pagination?: IPaginationProps;
  type?: TRequistionType;
  status?: TApprovalStatus;
}

export interface TApproval {
  id: number;
  requisition_id: number;
  approver_id: number;
  comment?: string;
  status: string;
  created_at: string;
  updated_at: string;
  requisition: Requisition;
  approver: Approver;
}

interface Approver {
  id: number;
  name: string;
  email: string;
  phone?: any;
  email_verified_at?: any;
  gender: string;
  two_factor_confirmed_at?: any;
  current_team_id?: any;
  profile_photo_path?: any;
  created_at: string;
  updated_at: string;
  choosen_school_id: number;
  profile_photo_url: string;
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
interface Requisition {
  id: number;
  requester_id: number;
  requester: User;
  requested_as: string;
  current_approver_id: number;
  current_stage_id?: any;
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
}

export const getAllApprovals = async ({
  token,
  schoolId,
  searchTerm,
  pagination,
  sessionId,
  type,
  status,
}: IGetApprovalsProps &
  IAuthProps & { schoolId: number; sessionId: number }): Promise<{
  data: TApproval[];
  total: number;
}> => {
  let url = `${process.env.REACT_APP_APP_URL}/api/approvals/${schoolId}`;

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

  const data: TApproval[] = result.map(
    (item: TApproval): TApproval => ({
      ...item,
    })
  );

  return {
    data,
    total: res.data?.meta.total,
  };
};

export const useFetchApprovals = (props: IGetApprovalsProps) => {
  const { token, sessionId, schoolId } = useApiAuth();
  // as per user Type and as per session
  return useQuery(
    ["approvals", props.type, props.status, props.pagination, props.searchTerm],
    () => getAllApprovals({ ...props, schoolId, sessionId, token })
  );
};
