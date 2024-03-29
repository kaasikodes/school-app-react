import moment from "moment";
import { useMutation, useQuery } from "react-query";

import { IPaginationProps, ISearchParams } from "../appTypes/requestParams";
import { TStaff, TStaffCourseTeacherRecord } from "../appTypes/staff";
import {
  addSessionCourseParticipant,
  addSessionCourseTeacher,
} from "../helpers/courses";
import { openNotification } from "../helpers/notifications";
import {
  getAllStaff,
  getSingleStaff,
  getSingleStaffCourseTeacherRecords,
  getSingleStaffSingleCourseTeacherRecord,
  IGetStaffCourseTeacherRecordProps,
  saveSchoolStaff,
  saveSchoolStaffInBulk,
  updateSchoolStaff,
} from "../helpers/staff";

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
  onSuccess?: Function;
}
interface IFRQSingleStaffCourseTeacherRecordsProps
  extends IGetStaffCourseTeacherRecordProps {
  onSuccess?: Function;
}
export interface IFRQReturnProps {
  data: TStaff[];
  total: number;
}
export interface IFRQSingleStaffCourseTeacherRecordsReturnProps {
  data: TStaffCourseTeacherRecord[];
  total: number;
}
export const QUERY_KEY_FOR_SINGLE_COURSE_TEACHER_RECORD =
  "single-course-teacher-record";
export const useFetchSingleStaffSingleCourseTeacherRecord = (
  props: Omit<
    IGetStaffCourseTeacherRecordProps,
    "pagination" | "searchParams"
  > & {
    courseId: number;
  }
) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_COURSE_TEACHER_RECORD, props],
    () => getSingleStaffSingleCourseTeacherRecord(props),
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

      select: (res: any) => {
        const fetchedData = res.data;
        const item = fetchedData;

        const data: TStaffCourseTeacherRecord = {
          id: item.data.id,
          submitted_assessment_for_compilation:
            item.data.submitted_assessment_for_compilation,
          staff: {
            id: item.data.staff.id,
            name: item.data.staff?.user.name,
            staffNo: item.data.staff.staff_no,
            email: item.data.staff?.user.email,
            createdAt: item.data.staff?.created_at
              ? moment(item.data.staff.created_at).format("YYYY/MM/DD")
              : "",
            updatedAt: item.data.staff?.updated_at
              ? moment(item.data.staff.updated_at).format("YYYY/MM/DD")
              : "",
          },
          course: {
            id: item.data.course.id,
            name: item.data.course.name,
            description: item.data.course.description,

            createdAt: item.data.course?.created_at
              ? moment(item.data.course.created_at).format("YYYY/MM/DD")
              : "",
            updatedAt: item.data.course?.updated_at
              ? moment(item.data.course.updated_at).format("YYYY/MM/DD")
              : "",
          },
          canRecord: item.data?.can_record,
          createdAt: item.data?.created_at
            ? moment(item.data.created_at).format("YYYY/MM/DD")
            : "",
          updatedAt: item.data?.updated_at
            ? moment(item.data.updated_at).format("YYYY/MM/DD")
            : "",
        };

        return data;
      },
    }
  );

  return queryData;
};
export const useFetchSingleStaffCourseTeacherRecords = (
  props: IFRQSingleStaffCourseTeacherRecordsProps
) => {
  const { pagination, searchParams, onSuccess } = props;
  const queryData = useQuery(
    ["staff", pagination?.page, pagination?.limit, searchParams],
    () => getSingleStaffCourseTeacherRecords(props),
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
        console.log(fetchedData, ".......", res.data);

        const data: TStaffCourseTeacherRecord[] = result.map(
          (item: any): TStaffCourseTeacherRecord => ({
            id: item.data.id,
            staff: {
              id: item.data.staff.id,
              name: item.data.staff?.user.name,
              staffNo: item.data.staff.staff_no,
              email: item.data.staff?.user.email,
              createdAt: item.data.staff?.created_at
                ? moment(item.data.staff.created_at).format("YYYY/MM/DD")
                : "",
              updatedAt: item.data.staff?.updated_at
                ? moment(item.data.staff.updated_at).format("YYYY/MM/DD")
                : "",
            },
            course: {
              id: item.data.course.id,
              name: item.data.course.name,
              description: item.data.course.description,

              createdAt: item.data.course?.created_at
                ? moment(item.data.course.created_at).format("YYYY/MM/DD")
                : "",
              updatedAt: item.data.course?.updated_at
                ? moment(item.data.course.updated_at).format("YYYY/MM/DD")
                : "",
            },
            canRecord: item.data?.can_record,
            createdAt: item.data?.created_at
              ? moment(item.data.created_at).format("YYYY/MM/DD")
              : "",
            updatedAt: item.data?.updated_at
              ? moment(item.data.updated_at).format("YYYY/MM/DD")
              : "",
          })
        );

        const ans: IFRQSingleStaffCourseTeacherRecordsReturnProps = {
          data,
          total: res.data?.meta.total,
        };

        return ans;
      },
    }
  );

  return queryData;
};
export const useFetchAllStaff = ({
  pagination,
  searchParams,
  token,
  schoolId,
  onSuccess,
  sessionId,
}: IFRQProps & { sessionId?: number }) => {
  const queryData = useQuery(
    ["staff", pagination?.page, pagination?.limit, searchParams],
    () =>
      getAllStaff({
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

        const data: TStaff[] = result.map(
          (item: any): TStaff => ({
            sessionLevelCount: item.data.class_teacher_records?.filter(
              (val: any) => val.school_session_id === sessionId
            ).length,
            id: item.data.id,
            name: item.data?.user.name,
            staffNo: item.data.staff_no,
            email: item.data?.user.email,
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

export const useFetchSingleStaff = ({
  id,
  token,
  schoolId,
  onSuccess,
}: IFRQSingleProps) => {
  const queryData = useQuery(
    ["single-staff", id],
    () =>
      getSingleStaff({
        schoolId,
        token,
        staffId: id,
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
        console.log(res, "ppp", res.data);
        const item = fetchedData;

        const data: TStaff = {
          id: item.data.id,
          name: item.data.user.name,
          email: item.data.user.email,
          staffNo: item.data.staff_no,

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

export const useAddStaffInBulk = () => {
  return useMutation(saveSchoolStaffInBulk);
};
export const useAddSingleStaff = () => {
  return useMutation(saveSchoolStaff);
};
export const useUpdateSingleStaff = () => {
  return useMutation(updateSchoolStaff);
};

export const useAddSessionCourseParticipantHook = () => {
  return useMutation(addSessionCourseParticipant);
};
export const useAddSessionCourseTeacher = () => {
  return useMutation(addSessionCourseTeacher);
};
