import moment from "moment";
import { useMutation, useQuery } from "react-query";
import { TDepartment } from "../appTypes/departments";
import { IPaginationProps, ISearchParams } from "../appTypes/requestParams";

import {
  deleteDepartment,
  getDepartment,
  getDepartments,
  saveSchoolDepartment,
  saveSchoolDepartmentInBulk,
  updateSchoolDepartment,
} from "../helpers/department";
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
  schoolId: string;
  token: string;
  onSuccess?: Function;
}
export interface IFRQReturnProps {
  data: TDepartment[];
  total: number;
}

export const useFetchDepartments = ({
  pagination,
  searchParams,
  token,
  schoolId,
  onSuccess,
}: IFRQProps) => {
  const queryData = useQuery(
    ["departments", pagination?.page, pagination?.limit, searchParams],
    () =>
      getDepartments({
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

        const data: TDepartment[] = result.map(
          (item: any): TDepartment => ({
            id: item.data.id,
            name: item.data.name,
            description: item.data.description,
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
export const useFetchSingleDepartment = ({
  id,
  token,
  schoolId,
  onSuccess,
}: IFRQSingleProps) => {
  const queryData = useQuery(
    ["department", id],
    () =>
      getDepartment({
        schoolId,
        token,
        departmentId: id,
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

        const data: TDepartment = {
          id: item.data.id,
          name: item.data.name,
          description: item.data.description,
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
        };

        const ans = data;

        return ans;
      },
    }
  );

  return queryData;
};

export const useAddDepartmentInBulk = () => {
  return useMutation(saveSchoolDepartmentInBulk);
};
export const useAddSingleDepartment = () => {
  return useMutation(saveSchoolDepartment);
};
export const useUpdateSingleDepartment = () => {
  return useMutation(updateSchoolDepartment);
};
export const useDeleteSingleDepartment = () => {
  return useMutation(deleteDepartment);
};
