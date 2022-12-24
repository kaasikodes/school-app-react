import axios from "axios";
import moment from "moment";
import { IPaginationProps, ISearchParams } from "../appTypes/requestParams";
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
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export const getDepartments = ({
  token,
  schoolId,
  pagination,
  searchParams,
}: IGetMultipleDepartmentProps) => {
  const limit = pagination?.limit ?? 10;
  const page = pagination?.page ?? 0;
  const name = searchParams?.name ?? "";

  let url = `${process.env.REACT_APP_APP_URL}/api/schools/${schoolId}/departments`;
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

export interface ISaveDepartmentProps extends IDepartmentAuthProps {
  description?: string;
  name: string;

  adminId: string;
}

export interface IUpdateDeptProps extends ISaveDepartmentProps {
  departmentId: string;
}
export interface ISaveDepartmentInBulkProps extends IDepartmentAuthProps {
  jsonData: string;
  adminId: string;
}
export const saveSchoolDepartment = ({
  token,
  schoolId,
  name,
  description,
  adminId,
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
    adminId,
  };

  const res: any = axios.post(url, data, config);
  return res;
};
export const updateSchoolDepartment = ({
  token,
  schoolId,
  name,
  description,

  adminId,
  departmentId,
}: IUpdateDeptProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/departments/${departmentId}/update`;

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
    adminId,
    departmentId,
  };

  const res: any = axios.patch(url, data, config);
  return res;
};
export const saveSchoolDepartmentInBulk = ({
  token,
  schoolId,
  jsonData,
  adminId,
}: ISaveDepartmentInBulkProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/departments/add-bulk?schoolId=${schoolId}`;

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

export const downloadBulkDepartmentUploadTemplate = (
  props?: IDownloadBulkUploadProps
): string => {
  let url = `${process.env.REACT_APP_APP_URL}/api/departments/export/bulk-template`;
  if (props) {
    url += "?";
  }
  if (props?.author) {
    url += `${props.author}`;
  }
  return url;
};
