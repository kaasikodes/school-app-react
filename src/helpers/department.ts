import axios from "axios";
import moment from "moment";
import { IAuthProps } from "./auth";

export interface IDepartmentAuthProps extends IAuthProps {
  schoolId: string;
}
interface IGetDepartmentProps extends IDepartmentAuthProps {
  departmentId: string;
}

export const getDepartment = ({ token, departmentId }: IGetDepartmentProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/departments/${departmentId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};
interface IGetMultipleDepartmentProps extends IDepartmentAuthProps {
  searchTerm?: string;
  page?: number;
  limit?: number;
}

export const getDepartments = ({
  token,
  schoolId,
  searchTerm,
  limit,
  page,
}: IGetMultipleDepartmentProps) => {
  const url = `${
    process.env.REACT_APP_APP_URL
  }/api/schools/${schoolId}/departments?${
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

interface ISaveDepartmentProps extends IDepartmentAuthProps {
  description?: string;
  name: string;
  id?: string;
}
export const saveSchoolDepartment = ({
  token,
  schoolId,
  name,
  description,
  id,
}: ISaveDepartmentProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/departments/save`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let data: any = {
    name,
    description,
    schoolId,
  };
  if (id) {
    data = { ...data, id };
  }

  const res: any = axios.post(url, data, config);
  return res;
};
