import axios from "axios";
import moment from "moment";
import { IAuthProps } from "./auth";

export interface IStudentAuthProps extends IAuthProps {
  schoolId: string;
}

interface ISaveStaffProps extends IStudentAuthProps {
  staffNo: string;
  id?: string;
  userId?: string;
  email: string;
  name?: string;
  password?: string;
}
export const saveSchoolStaff = ({
  token,
  schoolId,
  staffNo,
  userId,
  id,
  email,
  name,
  password,
}: ISaveStaffProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/staff/save-profile`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let data: any = {
    userId,
    staffNo,
    schoolId,
    name,
    email,
    password,
  };
  if (id) {
    data = { ...data, id };
  }

  const res: any = axios.post(url, data, config);
  return res;
};

interface IGetMultipleStudentProps extends IStudentAuthProps {
  searchTerm?: string;
  page?: number;
  limit?: number;
}

export const getAllStudents = ({
  token,
  schoolId,
  searchTerm,
  limit,
  page,
}: IGetMultipleStudentProps) => {
  const url = `${
    process.env.REACT_APP_APP_URL
  }/api/schools/${schoolId}/students?${
    searchTerm ? "searchTerm=" + searchTerm : ""
  }&limit=${(limit as number) > 0 ? limit : ""}&page=${
    (page as number) > 0 ? page : ""
  }`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};
