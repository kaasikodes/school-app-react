import axios from "axios";
import { IPaginationProps } from "../../appTypes/requestParams";
import { IAuthProps } from "../../helpers/auth";
import { TCreateInviteProps, TUserType } from "./useCreateSingleInvitation";
import { useQuery } from "react-query";
import useApiAuth from "../../hooks/useApiAuth";

export interface IGetInviteProps {
  searchTerm?: string;
  pagination?: IPaginationProps;
  sessionId?: number;
  userType?: TUserType;
}

export type TInvite = TCreateInviteProps & {
  id: number;
  sessionId: number;
  schoolId: number;
  code: string;
  accepted: number;
  acceptedAt: string;
  createdAt: string;
  updatedAt: string;
};

export const getAllInvites = async ({
  token,
  schoolId,
  searchTerm,
  pagination,
  sessionId,
  userType,
}: IGetInviteProps & IAuthProps & { schoolId: number }): Promise<{
  data: TInvite[];
  total: number;
}> => {
  let url = `${process.env.REACT_APP_APP_URL}/api/invites/${schoolId}`;

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
      userType,
    },
  };

  const res: any = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData;

  const data: TInvite[] = result.map(
    (item: any): TInvite => ({
      id: item.id,
      sessionId: item.session_id,
      schoolId: item.school_id,
      email: item.email,
      code: item.code,
      userType: item.user_type,
      acceptedAt: item.accepted_at,
      accepted: item.accepted,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    })
  );

  return {
    data,
    total: res.data?.meta.total,
  };
};

const useFetchInvitations = (props: IGetInviteProps) => {
  const { token, sessionId, schoolId } = useApiAuth();
  // as per user Type and as per session
  return useQuery(
    [
      "invites",
      props.sessionId,
      props.userType,
      props.pagination,
      props.searchTerm,
    ],
    () => getAllInvites({ ...props, schoolId, sessionId, token })
  );
};

export default useFetchInvitations;
