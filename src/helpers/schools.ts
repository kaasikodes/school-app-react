import axios from "axios";
import { IAuthProps } from "./auth";

interface IGetSchoolProps extends IAuthProps {
  id: string;
}
export interface IGetSchoolSessSettingProps extends IAuthProps {
  schoolId: string;
  sessionId: string;
}
interface IGetSchoolsProps extends IAuthProps {
  page?: number;
  limit?: number;
}

export const deleteSchool = ({ token, id }: IGetSchoolProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/schools/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.delete(url, config);
  return res;
};
export const getSchoolSessionSetting = ({
  token,
  schoolId,
  sessionId,
}: IGetSchoolSessSettingProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/school-session-setting/${schoolId}/${sessionId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};
export const getSchool = ({ token, id }: IGetSchoolProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/schools/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};
export const getSchools = ({ token, page, limit }: IGetSchoolsProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/schools?limit=${
    (limit as number) > 0 ? limit : ""
  }&page=${(page as number) > 0 ? page : ""}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};
interface ISaveSchoolProps extends IAuthProps {
  name: string;
  description: string;
  staffLimit?: number;
  studentLimit?: number;
  id?: string;
}
export const saveSchool = (props: ISaveSchoolProps) => {
  const { token } = props;
  const url = `${process.env.REACT_APP_APP_URL}/api/schools/save`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    name: props.name,
    description: props.description,
    studentLimit: props.studentLimit,
    staffLimit: props.staffLimit,
    id: props.id,
  };

  const res: any = axios.post(url, data, config);
  return res;
};
