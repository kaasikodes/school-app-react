import axios from "axios";
import moment from "moment";
import { IAuthProps } from "./auth";

export interface ICourseAuthProps extends IAuthProps {
  schoolId: string;
}
interface ISaveCourseProps extends ICourseAuthProps {
  id?: string;
  departmentId?: string;
  name: string;
  isActive?: boolean;
  description?: boolean;
}
export interface IASCParticipant extends ICourseAuthProps {
  courses: { courseId: string; levelId: string }[];
  sessionId: string;
  studentId: string;
}

export const addSessionCourseParticipant = ({
  token,
  schoolId,
  studentId,
  courses,
  sessionId,
}: IASCParticipant) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/courses/addSessionCourseParticipant`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let data: any = {
    schoolId,
    studentId,
    courses,
    sessionId,
  };

  const res: any = axios.post(url, data, config);
  return res;
};
export interface IASCTeacher extends ICourseAuthProps {
  courses: { courseId: string; levelId: string }[];
  sessionId: string;
  staffId: string;
}

export const addSessionCourseTeacher = ({
  token,
  schoolId,
  staffId,
  courses,
  sessionId,
}: IASCTeacher) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/courses/addSessionCourseTeacher`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let data: any = {
    schoolId,
    staffId,
    courses,
    sessionId,
  };

  const res: any = axios.post(url, data, config);
  return res;
};

export const saveSchoolCourse = ({
  token,
  schoolId,
  departmentId,
  id,
  isActive,
  name,
  description,
}: ISaveCourseProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/courses/save`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let data: any = {
    schoolId,
    departmentId,
    isActive,
    name,
    description,
  };
  if (id) {
    data = { ...data, id };
  }

  const res: any = axios.post(url, data, config);
  return res;
};

interface IGetCoursesProps extends ICourseAuthProps {
  searchTerm?: string;
  page?: number;
  limit?: number;
}

export const getCourses = ({
  token,
  schoolId,
  searchTerm,
  limit,
  page,
}: IGetCoursesProps) => {
  const url = `${
    process.env.REACT_APP_APP_URL
  }/api/schools/${schoolId}/courses?${
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
export const getCoursesGroupedByLevel = ({
  token,
  schoolId,
  searchTerm,
  limit,
  page,
}: IGetCoursesProps) => {
  const url = `${
    process.env.REACT_APP_APP_URL
  }/api/schools/${schoolId}/coursesGroupedByLevel?${
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
