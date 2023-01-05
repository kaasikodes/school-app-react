import axios from "axios";
import moment from "moment";
import { IAuthProps } from "./auth";

const token = localStorage.getItem("inokpa") as unknown as string;

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

interface IGetMultipleStudentProps extends IStudentAuthProps {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sessionId?: string;
}

export const getAllStudents = ({
  token,
  schoolId,
  searchTerm,
  limit,
  page,
  sessionId,
}: IGetMultipleStudentProps) => {
  const url = `${
    process.env.REACT_APP_APP_URL
  }/api/schools/${schoolId}/students?${
    searchTerm ? "searchTerm=" + searchTerm : ""
  }&limit=${(limit as number) > 0 ? limit : ""}&page=${
    (page as number) > 0 ? page : ""
  }&sessionId=${sessionId ?? ""}`;

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
  sessionId: number;
  studentId: string;
  levelId: number;
}
export const getStudentCoursesGroupedByLevel = ({
  token,
  schoolId,
  sessionId,
  studentId,
  levelId,
}: IGGSSLC) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/student/${studentId}/studentSessionCoursesGroupedByLevel?sessionId=${sessionId}&levelId=${levelId}`;

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
  author?: string;
}

export const downloadBulkStudentsUploadTemplate = (
  props?: IDownloadBulkUploadProps
): string => {
  let url = `${process.env.REACT_APP_APP_URL}/api/students/export/bulk-template`;
  if (props) {
    url += "?";
  }
  if (props?.author) {
    url += `${props.author}`;
  }
  return url;
};
