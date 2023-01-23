import axios from "axios";
import { IPaginationProps, ISearchParams } from "../appTypes/requestParams";
import { IAuthProps } from "./auth";

export interface IStaffAuthProps extends IAuthProps {
  schoolId: string;
}

export interface ISaveStaffProps extends IStaffAuthProps {
  staffNo: string;

  email: string;
  name?: string;
  password?: string;
}
export const saveSchoolStaff = ({
  token,
  schoolId,
  staffNo,

  email,
  name,
  password,
}: ISaveStaffProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/staff/save`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let data: any = {
    staffNo,
    schoolId,
    name,
    email,
    password,
  };

  const res: any = axios.post(url, data, config);
  return res;
};

interface IGetMultipleStaffProps extends IStaffAuthProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}
interface IGGSSLC extends IStaffAuthProps {
  sessionId: string;
  staffId: string;
}
export const getStaffSessionLevelsAndCourses = ({
  token,
  schoolId,
  sessionId,
  staffId,
}: IGGSSLC) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/staff/${staffId}/staffSessionLevelsAndCourses?sessionId=${sessionId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};

export interface IGetStaffCourseTeacherRecordProps extends IStaffAuthProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  sessionId: string;
  staffId: string;
  levelId: string;
}
export const getSingleStaffCourseTeacherRecords = ({
  token,
  schoolId,
  pagination,
  searchParams,
  staffId,
  levelId,
  sessionId,
}: IGetStaffCourseTeacherRecordProps) => {
  const limit = pagination?.limit ?? 10;
  const page = pagination?.page ?? 0;
  const name = searchParams?.name ?? "";

  let url = `${process.env.REACT_APP_APP_URL}/api/schools/${schoolId}/staff/${staffId}/course-teacher-records`;

  if (pagination || searchParams || sessionId || levelId) {
    url += "?";
  }
  if (pagination) {
    url += `limit=${limit}&page=${page}&`;
  }
  if (searchParams) {
    url += `searchTerm=${name}&`;
  }

  // needed parameters
  if (sessionId) {
    url += `sessionId=${sessionId}&`;
  }
  if (levelId) {
    url += `levelId=${levelId}&`;
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
export const getAllStaff = ({
  token,
  schoolId,
  pagination,
  searchParams,
}: IGetMultipleStaffProps) => {
  const limit = pagination?.limit ?? 10;
  const page = pagination?.page ?? 0;
  const name = searchParams?.name ?? "";

  let url = `${process.env.REACT_APP_APP_URL}/api/schools/${schoolId}/staff`;

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

interface IGetSingleStaffProps extends IStaffAuthProps {
  staffId: string;
  sessionId?: string;
}
export const getSingleStaff = ({
  token,
  schoolId,
  staffId,
  sessionId,
}: IGetSingleStaffProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/staff/${staffId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};

export interface ISaveStaffInBulkProps extends IStaffAuthProps {
  jsonData: string;
  adminId: string;
}
export const saveSchoolStaffInBulk = ({
  token,
  schoolId,
  jsonData,
  adminId,
}: ISaveStaffInBulkProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/staff/add-bulk?schoolId=${schoolId}`;

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
export interface IUpdateStaffProps extends IStaffAuthProps {
  staffId: string;
  staffNo: string;
}
export const updateSchoolStaff = ({
  token,
  schoolId,

  staffNo,

  // adminId,
  staffId,
}: IUpdateStaffProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/staff/${staffId}/update`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let data: any = {
    // TO DO
    // Need to rethink columns of staff, as its possible the staff name might be editted
    schoolId,
    staffNo,
  };

  const res: any = axios.patch(url, data, config);
  return res;
};

interface IDownloadBulkUploadProps {
  author?: string;
}

export const downloadBulkStaffUploadTemplate = (
  props?: IDownloadBulkUploadProps
): string => {
  let url = `${process.env.REACT_APP_APP_URL}/api/staff/export/bulk-template`;
  if (props) {
    url += "?";
  }
  if (props?.author) {
    url += `${props.author}`;
  }
  return url;
};
