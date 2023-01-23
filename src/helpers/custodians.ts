import axios from "axios";
import { IAuthProps } from "./auth";

export interface ICustAuthProps extends IAuthProps {
  schoolId: string;
}

export interface ISaveCustProps extends ICustAuthProps {
  studentId: string;

  occupation: string;
  email: string;
  name: string;
  phone: string;
}
export const saveSchoolCustodian = ({
  token,
  schoolId,
  studentId,

  email,
  name,
  occupation,
}: ISaveCustProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/custodians/save`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let data: any = {
    studentId,
    schoolId,
    name,
    email,
    occupation,
  };

  const res: any = axios.post(url, data, config);
  return res;
};
