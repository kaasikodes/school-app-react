import moment from "moment";
import { useMutation, useQuery } from "react-query";
import { TCourse } from "../appTypes/courses";
import { TLevel } from "../appTypes/levels";
import { IPaginationProps, ISearchParams } from "../appTypes/requestParams";
import {
  getClass,
  getClasses,
  saveSchoolClass,
  saveSchoolClassesInBulk,
  updateSchoolClass,
} from "../helpers/classes";

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
  data: TLevel[];
  total: number;
}

export const useFetchClasses = ({
  pagination,
  searchParams,
  token,
  schoolId,
  onSuccess,
}: IFRQProps) => {
  const queryData = useQuery(
    ["classes", pagination?.page, pagination?.limit, searchParams],
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

        const data: TLevel[] = result.map(
          (item: any): TLevel => ({
            id: item.data.id,
            name: item.data.name,
            description: item.data.description,
            courseCount: item?.courseCount,
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
export const useFetchSingleClass = ({
  id,
  token,
  schoolId,
  onSuccess,
}: IFRQSingleProps) => {
  const queryData = useQuery(
    ["class", id],
    () =>
      getClass({
        schoolId,
        token,
        classId: id,
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
