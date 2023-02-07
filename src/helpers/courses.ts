import axios from "axios";
import {
  IFilterParams,
  IPaginationProps,
  ISearchParams,
} from "../appTypes/requestParams";
import { IAuthProps } from "./auth";

export interface ICourseAuthProps extends IAuthProps {
  schoolId: string;
}
export interface ISaveCourseProps extends ICourseAuthProps {
  id?: string;
  departmentId?: string;
  name: string;
  isActive?: boolean;
  description?: boolean;
  levels?: number[];
}
interface ISaveCoursePartAssProps extends ICourseAuthProps {
  participantId: string;
  total: number;

  breakDown: any;
}
export const saveCourseParticipantAssessment = ({
  token,
  schoolId,
  participantId,

  breakDown,
  total,
}: ISaveCoursePartAssProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/save-participant-record`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let data: any = {
    schoolId,
    participantId,

    breakDown,
    total,
  };

  const res: any = axios.post(url, data, config);
  return res;
};
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

export interface IAStaffTHSCourse extends ICourseAuthProps {
  staffIds: number[];
  levelIds: number[];
  sessionId: string;
  courseId: string;
}
export interface IAStaffTHSClass extends ICourseAuthProps {
  classStaffIds: { levelId: number; staffId: number }[];
  sessionId: string;
}
export const assignStaffToHandleSessionCourse = ({
  token,
  schoolId,
  levelIds,
  staffIds,

  courseId,
  sessionId,
}: IAStaffTHSCourse) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/courses/assign-staff-to-handle-course-in-classes`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let data = {
    schoolId,
    levelIds,
    staffIds,

    courseId,
    sessionId,
  };

  const res: any = axios.post(url, data, config);
  return res;
};
export const assignStaffToHandleSessionClasses = ({
  token,
  schoolId,
  classStaffIds,

  sessionId,
}: IAStaffTHSClass) => {
  // TO DO MOVE THIS TO CLASSES
  const url = `${process.env.REACT_APP_APP_URL}/api/levels/assign-staff-to-handle-classes`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let data = {
    schoolId,
    classStaffIds,
    sessionId,
  };

  const res: any = axios.post(url, data, config);
  return res;
};
export interface ISaveCourseOverviewProps extends ICourseAuthProps {
  sessionId: string;
  levelId: string;
  courseId: string;
  breakDown: string;
  brief: string;
}

export const saveCourseOverview = (props: ISaveCourseOverviewProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/courses/saveSessionCourseSingleOverview`;
  const { token } = props;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let data = {
    ...props,
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
  levels = [],
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
    levels,
    description,
  };

  const res: any = axios.post(url, data, config);
  return res;
};
interface IGetCourseProps extends ICourseAuthProps {
  courseId: string;
}
interface IGetSessLevelCourseOWProps extends IGetCourseProps {
  courseId: string;
  levelId: string;
  sessionId: string;
}

export const getCourse = ({ token, courseId }: IGetCourseProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/courses/${courseId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};
export const getSessionLevelCourseOverview = (
  props: IGetSessLevelCourseOWProps
) => {
  const { token, courseId, sessionId, levelId } = props;
  const url = `${process.env.REACT_APP_APP_URL}/api/courses/${courseId}/sessionCourseSingleOverview?sessionId=${sessionId}&levelId=${levelId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res: any = axios.get(url, config);
  return res;
};

interface IGetCoursesProps extends ICourseAuthProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  filterParams?: IFilterParams;
}

export const getCourses = ({
  token,
  schoolId,
  pagination,
  searchParams,
  filterParams,
}: IGetCoursesProps) => {
  const limit = pagination?.limit ?? 10;
  const page = pagination?.page ?? 0;
  const name = searchParams?.name ?? "";
  const levelId = filterParams?.levelId ?? "";

  let url = `${process.env.REACT_APP_APP_URL}/api/schools/${schoolId}/courses`;

  if (pagination || searchParams || filterParams) {
    url += "?";
  }
  if (pagination) {
    url += `limit=${limit}&page=${page}&`;
  }
  if (searchParams) {
    url += `searchTerm=${name}&`;
  }
  if (filterParams?.levelId) {
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
interface IGetCoursePsProps extends ICourseAuthProps {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sessionId: string;
  levelId: string;
  courseId: string;
}
interface IGetCoursePsSingleProps extends ICourseAuthProps {
  sessionId: string;
  levelId: string;
  courseId: string;
  studentId: string;
}

export const getSessionCourseParticipants = ({
  token,
  schoolId,
  searchTerm,
  limit,
  page,
  sessionId,
  courseId,
  levelId,
}: IGetCoursePsProps) => {
  const url = `${
    process.env.REACT_APP_APP_URL
  }/api/courses/${courseId}/sessionCourseParticipants?sessionId=${sessionId}&levelId=${levelId}&${
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
export const getSessionCourseSingleParticipant = ({
  token,
  studentId,
  sessionId,
  courseId,
  levelId,
}: IGetCoursePsSingleProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/courses/${courseId}/sessionCourseSingleParticipant?sessionId=${sessionId}&levelId=${levelId}&studentId=${studentId}`;

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
  pagination,
  searchParams,
}: IGetCoursesProps) => {
  const limit = pagination?.limit ?? 10;
  const page = pagination?.page ?? 0;
  const name = searchParams?.name ?? "";
  let url = `${process.env.REACT_APP_APP_URL}/api/schools/${schoolId}/coursesGroupedByLevel`;

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

export interface IUpdateCourseProps extends ISaveCourseProps {
  courseId: string;
}
export const updateSchoolCourse = ({
  token,
  schoolId,
  name,
  description,
  departmentId,

  // adminId,
  courseId,
}: IUpdateCourseProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/courses/${courseId}/update`;

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
    departmentId,
    // adminId,
    courseId,
  };

  const res: any = axios.patch(url, data, config);
  return res;
};

export interface ISaveCourseInBulkProps extends ICourseAuthProps {
  jsonData: string;
  adminId: string;
}
export const saveSchoolCoursesInBulk = ({
  token,
  schoolId,
  jsonData,
  adminId,
}: ISaveCourseInBulkProps) => {
  const url = `${process.env.REACT_APP_APP_URL}/api/courses/add-bulk?schoolId=${schoolId}`;

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

export const downloadBulkCoursesUploadTemplate = (
  props?: IDownloadBulkUploadProps
): string => {
  let url = `${process.env.REACT_APP_APP_URL}/api/courses/export/bulk-template`;
  if (props) {
    url += "?";
  }
  if (props?.author) {
    url += `${props.author}`;
  }
  return url;
};
