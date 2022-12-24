import axios from "axios";
import moment from "moment";
import { IAuthProps } from "./auth";

export interface IStaffAuthProps extends IAuthProps {
  schoolId: string;
}

interface ISaveStaffProps extends IStaffAuthProps {
  staffNo: string;
  id?: string;
  userId?: string;
  email: string;
  name?: string;
  password?: string;
}
interface IGetSingleStaffProps extends IStaffAuthProps {
  adminId: string;
}
export const getSingleAdmin = ({
  token,
  schoolId,
  adminId,
}: IGetSingleStaffProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/schools/${schoolId}/admin/${adminId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};
