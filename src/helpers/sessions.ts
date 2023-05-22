import axios from "axios";
import { IPaginationProps, ISearchParams } from "../appTypes/requestParams";
import { IAuthProps } from "./auth";

export interface ISchoolAuthProps extends IAuthProps {
  schoolId: string;
}
export interface IGetSessProps extends IAuthProps {
  sessionId: string;
}
interface IGetMultipleSessProps extends ISchoolAuthProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
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
export const getSessionTaskCompletion = ({
  token,
  sessionId,
}: IGetSessProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/sessions/${sessionId}/task-completion`;

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
  pagination,
  searchParams,
}: IGetMultipleSessProps) => {
  const limit = pagination?.limit ?? 10;
  const page = pagination?.page ?? 0;
  const name = searchParams?.name ?? "";
  let url = `${process.env.REACT_APP_APP_URL}/api/schools/${schoolId}/sessions`;
  if (pagination || searchParams) {
    url += "?";
  }
  if (pagination) {
    url += `limit=${limit}&page=${page}&`;
  }
  if (searchParams) {
    url += `searchTerm=${name}&`;
  }
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};
// interface IUpdateSessionProps extends ISchoolAuthProps {
//   sessionId: string;
// }
export const endSchoolSession = (props: {
  sessionId: number;
  token: string;
}) => {
  const { token } = props;
  const url = `${process.env.REACT_APP_APP_URL}/api/sessions/${props.sessionId}/end-session`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {};

  const res: any = axios.post(url, data, config);
  return res;
};

export const issueResultForSession = (props: {
  sessionId: number;
  token: string;
}) => {
  const { token } = props;
  const url = `${process.env.REACT_APP_APP_URL}/api/sessions/${props.sessionId}/issue-result`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {};

  const res: any = axios.post(url, data, config);
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
