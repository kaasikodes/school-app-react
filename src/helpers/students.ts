import axios from "axios";
import { IAuthProps } from "./auth";

// const token = localStorage.getItem("inokpa") as unknown as string;

export interface IStudentAuthProps extends IAuthProps {
  schoolId: string;
}

export interface IEnrollStudentProps extends IStudentAuthProps {
  // personal info 4 student
  idNo: string;
  name: string;
  email: string;
  phone: string;
  currentClassId: number;

  // payment info -> TO DO (l8r)
  // paymentCategoryId: string;
  // schoolFeeAmountPaid: string;
  // popDocumentUrl: string;
  // note?: string;

  // session info
  // currentSessionId: number; => be found from school id

  // course combo
  sessionCourses: {
    levelId: number;
    courseId: number;
  }[];

  // custodians
  custodians?: {
    name: string;
    occupation: string;
    email: string;
    phone: string;
  };
}
export const enrollNewStudent = (props: IEnrollStudentProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/schools/${props.schoolId}/enroll-new-student-for-session`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };
  let data = props;

  const res: any = axios.post(url, data, config);
  return res;
};

export interface IGetMultipleStudentProps extends IStudentAuthProps {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sessionId?: string;
  custodianId?: string;
}

export const getAllStudents = ({
  token,
  schoolId,
  searchTerm,
  limit,
  page,
  sessionId,
  custodianId,
}: IGetMultipleStudentProps) => {
  let url = `${
    process.env.REACT_APP_APP_URL
  }/api/schools/${schoolId}/students?${
    searchTerm ? "searchTerm=" + searchTerm : ""
  }&limit=${(limit as number) > 0 ? limit : ""}&page=${
    (page as number) > 0 ? page : ""
  }&sessionId=${sessionId ?? ""}`;

  if (custodianId) {
    url += `&custodianId=${custodianId}`;
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
interface IGetSingleStudentProps extends IStudentAuthProps {
  studentId: string;
  sessionId?: string;
}
export const getStudent = ({
  token,
  schoolId,
  studentId,
  sessionId,
}: IGetSingleStudentProps) => {
  const url = `${
    process.env.REACT_APP_APP_URL
  }/api/schools/${schoolId}/students/${studentId}?sessionId=${sessionId ?? ""}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};

interface IGGSSLC extends IStudentAuthProps {
  sessionId: string;
  studentId: string;
}
export const getStudentCoursesGroupedByLevel = ({
  token,
  schoolId,
  sessionId,
  studentId,
}: IGGSSLC) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/student/${studentId}/studentSessionCoursesGroupedByLevel?sessionId=${sessionId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};

interface IDownloadBulkUploadProps {
  schoolId: string;
}

export const downloadBulkStudentsUploadTemplate = (
  props: IDownloadBulkUploadProps
): string => {
  let url = `${process.env.REACT_APP_APP_URL}/api/schools/${props.schoolId}/students/export/bulk-template`;

  return url;
};

export interface ISaveStudentInBulkProps extends IStudentAuthProps {
  jsonData: string;
  adminId: string;
}
export const saveSchoolStudentInBulk = ({
  token,
  schoolId,
  jsonData,
  adminId,
}: ISaveStudentInBulkProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/students/add-bulk?schoolId=${schoolId}`;

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
