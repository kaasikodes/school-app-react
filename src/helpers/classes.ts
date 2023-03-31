import axios from "axios";
import { IPaginationProps, ISearchParams } from "../appTypes/requestParams";
import { IAuthProps } from "./auth";

export interface IClassAuthProps extends IAuthProps {
  schoolId: string;
}
interface IGetCLassProps extends IClassAuthProps {
  classId: string;
}

export const getClass = ({
  token,
  classId,
  sessionId,
}: IGetCLassProps & { sessionId?: number }) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/levels/${classId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      sessionId,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};
interface IGetMultipleCLassProps extends IClassAuthProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export const getClasses = ({
  token,
  schoolId,
  pagination,
  searchParams,
}: IGetMultipleCLassProps) => {
  const limit = pagination?.limit ?? 10;
  const page = pagination?.page ?? 0;
  const name = searchParams?.name ?? "";

  let url = `${process.env.REACT_APP_APP_URL}/api/schools/${schoolId}/levels`;

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

export interface ISaveClassProps extends IClassAuthProps {
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
export interface IUpdateClassProps extends ISaveClassProps {
  classId: string;
}
export const updateSchoolClass = ({
  token,
  schoolId,
  name,
  description,

  // adminId,
  classId,
}: IUpdateClassProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/levels/${classId}/update`;

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
    // adminId,
    classId,
  };

  const res: any = axios.patch(url, data, config);
  return res;
};
export interface ISaveClassInBulkProps extends IClassAuthProps {
  jsonData: string;
  adminId: string;
}
export const saveSchoolClassesInBulk = ({
  token,
  schoolId,
  jsonData,
  adminId,
}: ISaveClassInBulkProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/levels/add-bulk?schoolId=${schoolId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let data = {
    jsonData: JSON.parse(jsonData),
    adminId,
  };

  const res: any = axios.post(url, data, config);
  return res;
};

interface IDownloadBulkUploadProps {
  author?: string;
}

export const downloadBulkClassesUploadTemplate = (
  props?: IDownloadBulkUploadProps
): string => {
  let url = `${process.env.REACT_APP_APP_URL}/api/levels/export/bulk-template`;
  if (props) {
    url += "?";
  }
  if (props?.author) {
    url += `${props.author}`;
  }
  return url;
};
