import axios from "axios";
import moment from "moment";
import { IAuthProps } from "./auth";

const token = localStorage.getItem("inokpa") as unknown as string;

export interface IStudentAuthProps extends IAuthProps {
  schoolId: string;
}

export interface IEnrollStudentProps extends IStudentAuthProps {
  idNo: string;
  name: string;
  email?: string;
  phone?: string;
  userId?: string;
  currentClassId: string;
  currentSessionId: string;
  schoolFeeAmountPaid: string;
  popDocumentUrl: string;
  sessionCourses: { levelId: string; courseId: string }[];
}
export const enrollStudent = (props: IEnrollStudentProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/student/save-profile`;

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
}

export const getAllStudents = ({
  token,
  schoolId,
  searchTerm,
  limit,
  page,
}: IGetMultipleStudentProps) => {
  const url = `${
    process.env.REACT_APP_APP_URL
  }/api/schools/${schoolId}/students?${
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
