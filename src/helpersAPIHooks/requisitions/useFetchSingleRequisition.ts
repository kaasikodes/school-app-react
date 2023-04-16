import axios from "axios";
import { IAuthProps } from "../../helpers/auth";
import useApiAuth from "../../hooks/useApiAuth";
import { useQuery } from "react-query";
import { TRequisition } from "./useFetchRequisitions";

export interface IGetRequisitionProps {
  id: number;
}

export const getRequisition = async ({
  token,
  id,
}: IGetRequisitionProps &
  IAuthProps & {
    schoolId: number;
    sessionId: number;
  }): Promise<TRequisition> => {
  let url = `${process.env.REACT_APP_APP_URL}/api/single-requisition/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = await axios.get(url, config);
  const fetchedData = res.data.data;
  const data: TRequisition = fetchedData;

  return data;
};

export const useFetchSingleRequisition = (props: IGetRequisitionProps) => {
  const { token, sessionId, schoolId } = useApiAuth();
  // as per user Type and as per session
  return useQuery(["single-requisition", props.id], () =>
    getRequisition({ ...props, schoolId, sessionId, token })
  );
};
