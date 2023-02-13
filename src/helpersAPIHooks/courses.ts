import moment from "moment";
import { useMutation, useQuery } from "react-query";
import { TCourse } from "../appTypes/courses";
import { TLevel } from "../appTypes/levels";
import {
  IFilterParams,
  IPaginationProps,
  ISearchParams,
} from "../appTypes/requestParams";
import {
  addSessionCourseParticipant,
  addSessionCourseTeacher,
  assignStaffToHandleSessionClasses,
  assignStaffToHandleSessionCourse,
  getCourse,
  getCourses,
  getSessionLevelCourseOverview,
  IGetSessLevelCourseOWProps,
  saveCourseOverview,
  saveSchoolCourse,
  saveSchoolCoursesInBulk,
  updateSchoolCourse,
} from "../helpers/courses";
import { openNotification } from "../helpers/notifications";

interface IFRQSingleProps {
  id: string;
  schoolId: string;
  token: string;
  onSuccess?: Function;
}
interface IFRQProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  filterParams?: IFilterParams;
  schoolId: string;
  token: string;
  onSuccess?: Function;
}
export interface IFRQReturnProps {
  data: TCourse[];
  total: number;
}

export const useFetchCourses = ({
  pagination,
  searchParams,
  token,
  schoolId,
  onSuccess,
}: IFRQProps) => {
  const queryData = useQuery(
    ["courses", pagination?.page, pagination?.limit, searchParams],
    () =>
      getCourses({
        schoolId,
        token,
        searchParams,
        pagination: { limit: pagination?.limit, page: pagination?.page },
      }),
    {
      // enabled: filterParams ? !!filterParams?.levelId : true,
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

        const data: TCourse[] = result.map(
          (item: any): TCourse => ({
            id: item.data.id,
            name: item.data.name,
            description: item.data.description,
            levelCount: item?.levelCount,
            department: item?.department
              ? {
                  id: item.department.id,
                  name: item.department.name,
                }
              : undefined,
            createdAt: item.data?.created_at
              ? moment(item.data.created_at).format("YYYY/MM/DD")
              : "",
            updatedAt: item.data?.updated_at
              ? moment(item.data.updated_at).format("YYYY/MM/DD")
              : "",
          })
        );

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
export const useFetchCourseOverview = ({
  levelId,
  courseId,
  token,
  schoolId,
  sessionId,
}: IGetSessLevelCourseOWProps) => {
  const queryData = useQuery(
    ["course-overview", levelId, courseId, sessionId],
    () =>
      getSessionLevelCourseOverview({
        levelId,
        courseId,
        token,
        schoolId,
        sessionId,
      }),
    {
      // enabled: filterParams ? !!filterParams?.levelId : true,
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

      select: (res: any) => {
        const fetchedData = res.data.data;
        const result = fetchedData;

        const ans = {
          brief: result.brief,
          id: result.id,
          breakDown: result.break_down,
        };

        return ans;
      },
    }
  );

  return queryData;
};

interface IFRQGroupedByLevelProps extends IFRQProps {
  levelId: number;
}

export const useFetchCoursesGroupedByLevel = ({
  pagination,
  searchParams,
  token,
  schoolId,
  onSuccess,
  levelId,
}: IFRQGroupedByLevelProps) => {
  const queryData = useQuery(
    [
      "courses-groupedByLevel",
      pagination?.page,
      pagination?.limit,
      searchParams,
      levelId,
    ],
    () =>
      getCourses({
        schoolId,
        token,
        searchParams,
        pagination: { limit: pagination?.limit, page: pagination?.page },
        filterParams: {
          levelId,
        },
      }),
    {
      enabled: levelId === 0 ? false : true,
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

        const data: TCourse[] = result.map(
          (item: any): TCourse => ({
            id: item.data.id,
            name: item.data.name,
            description: item.data.description,
            levelCount: item?.levelCount,
            department: item?.department
              ? {
                  id: item.department.id,
                  name: item.department.name,
                }
              : undefined,
            createdAt: item.data?.created_at
              ? moment(item.data.created_at).format("YYYY/MM/DD")
              : "",
            updatedAt: item.data?.updated_at
              ? moment(item.data.updated_at).format("YYYY/MM/DD")
              : "",
          })
        );

        return data;
      },
    }
  );

  return queryData;
};

export const useFetchSingleCourse = ({
  id,
  token,
  schoolId,
  onSuccess,
}: IFRQSingleProps) => {
  const queryData = useQuery(
    ["course", id],
    () =>
      getCourse({
        schoolId,
        token,
        courseId: id,
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

        const data: TCourse = {
          id: item.data.id,
          name: item.data.name,
          description: item.data.description,
          levelCount: item.data?.levels?.length,
          levels: item.data?.levels.map(
            (item: any): TLevel => ({
              id: item.id,
              name: item.name,
              description: item.description,
              courseCount: item?.courseCount,
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
            })
          ),
          department: item?.data?.department
            ? {
                id: item?.data.department.id,
                name: item?.data.department.name,
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

export const useAddCoursesInBulk = () => {
  return useMutation(saveSchoolCoursesInBulk);
};
export const useAddSingleCourse = () => {
  return useMutation(saveSchoolCourse);
};
export const useUpdateSingleCourse = () => {
  return useMutation(updateSchoolCourse);
};

export const useAddSessionCourseParticipantHook = () => {
  return useMutation(addSessionCourseParticipant);
};
export const useAddSessionCourseTeacher = () => {
  return useMutation(addSessionCourseTeacher);
};
export const useAssignStaffToHandleSessionCourse = () => {
  return useMutation(assignStaffToHandleSessionCourse);
};
export const useAssignStaffToHandleSessionClasses = () => {
  return useMutation(assignStaffToHandleSessionClasses);
};
export const useSaveCourseOverview = () => {
  return useMutation(saveCourseOverview);
};
