import axios from "axios";
import moment from "moment";
import { IAuthProps } from "./auth";

export interface IClassAuthProps extends IAuthProps {
  schoolId: string;
}
interface IGetCLassProps extends IClassAuthProps {
  classId: string;
}

export const getClass = ({ token, classId }: IGetCLassProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/levels/${classId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};
interface IGetMultipleCLassProps extends IClassAuthProps {
  searchTerm?: string;
  page?: number;
  limit?: number;
}

export const getClasses = ({
  token,
  schoolId,
  searchTerm,
  limit,
  page,
}: IGetMultipleCLassProps) => {
  const url = `${
    process.env.REACT_APP_APP_URL
  }/api/schools/${schoolId}/levels?${
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

interface ISaveClassProps extends IClassAuthProps {
  description?: string;
  name: string;
  id?: string;
}
export const saveSchoolClass = ({
  token,
  schoolId,
  name,
  description,
  id,
}: ISaveClassProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/levels/save`;

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
