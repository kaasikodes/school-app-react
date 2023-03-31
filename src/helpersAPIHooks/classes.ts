import axios from "axios";
import moment from "moment";
import { useMutation, useQuery } from "react-query";
import { TCourse } from "../appTypes/courses";
import { TLevel } from "../appTypes/levels";
import { IPaginationProps, ISearchParams } from "../appTypes/requestParams";
import { TStaff } from "../appTypes/staff";
import { IAuthProps } from "../helpers/auth";
import {
  getClass,
  getClasses,
  saveSchoolClass,
  saveSchoolClassesInBulk,
  updateSchoolClass,
} from "../helpers/classes";

import { openNotification } from "../helpers/notifications";
import useApiAuth from "../hooks/useApiAuth";

interface IFRQSingleProps {
  id: string;
  schoolId: string;
  token: string;
  onSuccess?: Function;
}
interface IFRQProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  schoolId: string;
  token: string;
  sessionId?: number;
  onSuccess?: Function;
}
export interface IFRQReturnProps {
  data: TLevel[];
  total: number;
}

export const useFetchClasses = ({
  pagination,
  searchParams,
  token,
  schoolId,
  onSuccess,
  sessionId,
}: IFRQProps) => {
  const queryData = useQuery(
    ["classes", pagination?.page, pagination?.limit, searchParams?.name],
    () =>
      getClasses({
        schoolId,
        token,
        searchParams,
        pagination: { limit: pagination?.limit, page: pagination?.page },
      }),
    {
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {
        // show notification
        openNotification({
          state: "error",
          title: "Error Occurred",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
      onSuccess: (data) => {
        onSuccess && onSuccess(data);
      },

      select: (res: any) => {
        const fetchedData = res.data.data;
        const result = fetchedData;

        const data: TLevel[] = result.map((item: any): TLevel => {
          const fetchedTeacherData = item.data.class_session_teachers.find(
            (val: any) => val.school_session_id === sessionId
          );
          const sessionClassTeacher:
            | Pick<TStaff, "name" | "id" | "email">
            | undefined = fetchedTeacherData
            ? {
                email: fetchedTeacherData?.staff?.user.email,
                id: fetchedTeacherData?.id,
                name: fetchedTeacherData?.staff?.user.name,
              }
            : undefined;

          return {
            id: item.data.id,
            name: item.data.name,
            description: item.data.description,
            courseCount: item?.courseCount,
            classTeacher: sessionClassTeacher,
            courses: item.data?.courses.map(
              (item: any): TCourse => ({ id: item.id, name: item.name })
            ),
            author: item?.author
              ? {
                  id: item.author.id,
                  name: item.author.name,
                }
              : undefined,
            createdAt: item.data?.created_at
              ? moment(item.data.created_at).format("YYYY/MM/DD")
              : "",
            updatedAt: item.data?.updated_at
              ? moment(item.data.updated_at).format("YYYY/MM/DD")
              : "",
          };
        });

        const ans: IFRQReturnProps = {
          data,
          total: res.data?.meta.total,
        };

        return ans;
      },
    }
  );

  return queryData;
};
export const useFetchSingleClass = ({
  id,
  token,
  schoolId,
  onSuccess,
  sessionId,
}: IFRQSingleProps & { sessionId?: number }) => {
  const queryData = useQuery(
    ["class", id, sessionId],
    () =>
      getClass({
        schoolId,
        token,
        classId: id,
        sessionId,
      }),
    {
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {
        // show notification
        openNotification({
          state: "error",
          title: "Error Occurred",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
      onSuccess: (data) => {
        onSuccess && onSuccess(data);
      },

      select: (res: any) => {
        const fetchedData = res.data;
        const item = fetchedData;

        const data: TLevel = {
          id: item.data.id,
          name: item.data.name,
          description: item.data.description,
          courseCount: item?.courseCount,

          courses: item.data.courses.map(
            (
              item: any
            ): Pick<
              TCourse & {
                courseSessionTeacherStaffId?: number;
                courseSessionTeacherStaffUser?: {
                  name: string;
                  email: string;
                  staffNo: string;
                };
              },
              | "id"
              | "name"
              | "courseSessionTeacherStaffId"
              | "courseSessionTeacherStaffUser"
            > => {
              const courseSessionTeacherStaff = (
                item?.course_teacher_records as unknown as any[]
              )[0];
              return {
                id: item.id,
                name: item.name,
                courseSessionTeacherStaffId: item?.course_teacher_records
                  ? courseSessionTeacherStaff?.staff_id
                  : undefined,
                courseSessionTeacherStaffUser: item?.course_teacher_records
                  ? {
                      name: courseSessionTeacherStaff.staff.user.name,
                      email: courseSessionTeacherStaff.staff.user.email,
                      staffNo: courseSessionTeacherStaff.staff.staff_no,
                    }
                  : undefined,
              };
            }
          ),
          author: item?.author
            ? {
                id: item.author.id,
                name: item.author.name,
              }
            : undefined,
          createdAt: item.data?.created_at
            ? moment(item.data.created_at).format("YYYY/MM/DD")
            : "",
          updatedAt: item.data?.updated_at
            ? moment(item.data.updated_at).format("YYYY/MM/DD")
            : "",
        };

        const ans = data;

        return ans;
      },
    }
  );

  return queryData;
};

export const useAddClassesInBulk = () => {
  return useMutation(saveSchoolClassesInBulk);
};
export const useAddSingleClass = () => {
  return useMutation(saveSchoolClass);
};
export const useUpdateSingleClass = () => {
  return useMutation(updateSchoolClass);
};

type TClassTeacherRecord = {
  id: number;
  staffId: number;
  staff?: TStaff;
  levelId: number;
  level?: TLevel;
};
//
const getClassTeacherRecordsPerSession = async (
  props: IAuthProps & { sessionId: number } & { pagination?: IPaginationProps }
): Promise<{ data: TClassTeacherRecord[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const page = pagination?.page ?? 0;

  const url = `${process.env.REACT_APP_APP_URL}/api/levels/class-teacher-records/${props.sessionId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
    params: {
      limit,
      page,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData;

  console.log("result NEW ____", res);

  const data: TClassTeacherRecord[] = result.map(
    (item: any): TClassTeacherRecord => ({
      id: item.id,
      staffId: item.staff_id,
      levelId: item.level_id,
    })
  );

  const ans = {
    data,
    total: res.data?.meta.total,
  };

  return ans;
};
const CLASS_TEACHER_RECORDS_PER_SESSION_KEY =
  "class-teacher-records-per-session";

export const useFetchClassTeacherRecordsPerSession = (
  props: {
    pagination?: IPaginationProps;
  } = {}
) => {
  const { pagination } = props;
  const { token, sessionId } = useApiAuth();
  const queryData = useQuery(
    [
      CLASS_TEACHER_RECORDS_PER_SESSION_KEY,
      pagination?.page,
      pagination?.limit,
    ],
    () =>
      getClassTeacherRecordsPerSession({
        ...props,
        token,
        sessionId,
        pagination,
      }),
    {
      onError: (err: any) => {
        console.log(err);
      },
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  return queryData;
};
