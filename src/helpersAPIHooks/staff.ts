import moment from "moment";
import { useMutation, useQuery } from "react-query";

import { TLevel } from "../appTypes/levels";
import { IPaginationProps, ISearchParams } from "../appTypes/requestParams";
import { TStaff } from "../appTypes/staff";
import {
  addSessionCourseParticipant,
  addSessionCourseTeacher,
  saveSchoolCourse,
  saveSchoolCoursesInBulk,
  updateSchoolCourse,
} from "../helpers/courses";
import { openNotification } from "../helpers/notifications";
import {
  getAllStaff,
  getSingleStaff,
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
export interface IFRQReturnProps {
  data: TStaff[];
  total: number;
}

export const useFetchAllStaff = ({
  pagination,
  searchParams,
  token,
  schoolId,
  onSuccess,
}: IFRQProps) => {
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
