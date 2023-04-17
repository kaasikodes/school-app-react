import axios from "axios";
import { IAuthProps } from "../../helpers/auth";
import useApiAuth from "../../hooks/useApiAuth";
import { useQuery } from "react-query";
import { TApproval } from "./useFetchApprovals";

export interface IGetApprovalProps {
  id: number;
}

export const getApproval = async ({
  token,
  id,
}: IGetApprovalProps &
  IAuthProps & {
    schoolId: number;
    sessionId: number;
  }): Promise<TApproval> => {
  let url = `${process.env.REACT_APP_APP_URL}/api/single-approval/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = await axios.get(url, config);
  const fetchedData = res.data.data;
  const data: TApproval = fetchedData;

  return data;
};

export const useFetchSingleApproval = (props: IGetApprovalProps) => {
  const { token, sessionId, schoolId } = useApiAuth();
  // as per user Type and as per session
  return useQuery(["single-approval", props.id], () =>
    getApproval({ ...props, schoolId, sessionId, token })
  );
};
