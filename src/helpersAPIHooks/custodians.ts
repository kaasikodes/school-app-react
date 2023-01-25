import moment from "moment";
import { useMutation, useQuery } from "react-query";
import { TCustodian } from "../appTypes/custodians";
import { IPaginationProps, ISearchParams } from "../appTypes/requestParams";
import { getAllCustodians, saveSchoolCustodian } from "../helpers/custodians";
import { openNotification } from "../helpers/notifications";

interface IFRQProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  schoolId: string;
  token: string;
  onSuccess?: Function;
}
export interface IFRQReturnProps {
  data: TCustodian[];
  total: number;
}

export const useFetchAllCustodians = ({
  pagination,
  searchParams,
  token,
  schoolId,
  onSuccess,
}: IFRQProps) => {
  const queryData = useQuery(
    ["staff", pagination?.page, pagination?.limit, searchParams],
    () =>
      getAllCustodians({
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

        const data: TCustodian[] = result.map(
          (item: any): TCustodian => ({
            id: item.data.id,
            name: item.data?.user.name,
            studentCount: item.data?.pivot.students.length,
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

export const useAddSingleCusodian = () => {
  return useMutation(saveSchoolCustodian);
};
