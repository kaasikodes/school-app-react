import axios from "axios";
import moment from "moment";
import { IAuthProps } from "./auth";

export interface ISchoolAuthProps extends IAuthProps {
  schoolId: string;
}
interface IGetSessProps extends IAuthProps {
  sessionId: string;
}
interface IGetMultipleSessProps extends ISchoolAuthProps {
  searchTerm?: string;
  page?: number;
  limit?: number;
}

export const getSession = ({ token, sessionId }: IGetSessProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/sessions/${sessionId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};
export const getSessions = ({
  token,
  schoolId,
  searchTerm,
  limit,
  page,
}: IGetMultipleSessProps) => {
  const url = `${
    process.env.REACT_APP_APP_URL
  }/api/schools/${schoolId}/sessions?${
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
interface IUpdateSessionProps extends ISchoolAuthProps {
  sessionId: string;
}
export const endSchoolSession = ({
  token,
  schoolId,
  sessionId,
}: IUpdateSessionProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/sessions/${sessionId}/end-session`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    ends: moment().format("YYYY-MM-DD"),
  };

  const res: any = axios.patch(url, data, config);
  return res;
};
interface ICreateSessionProps extends ISchoolAuthProps {
  starts: string;
  description?: string;
  name: string;
}
export const addSchoolSession = ({
  token,
  schoolId,
  starts,
  name,
  description,
}: ICreateSessionProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/sessions/create`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    starts,
    name,
    description,
    schoolId,
  };

  const res: any = axios.post(url, data, config);
  return res;
};
interface IUpdateASessionProps extends ICreateSessionProps {
  sessionId: string;
}
export const updateSchoolSession = ({
  token,
  schoolId,
  starts,
  name,
  description,
  sessionId,
}: IUpdateASessionProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/sessions/${sessionId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    starts,
    name,
    description,
  };

  const res: any = axios.patch(url, data, config);
  return res;
};
