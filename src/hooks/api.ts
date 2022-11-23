import { useMutation, useQuery } from "react-query";
import { openNotification } from "../helpers/notifications";

interface IMutateProps {
  requestFn: Function;
}

export const mutateData = ({ requestFn }: IMutateProps) => {
  const { isLoading, isError, isSuccess, mutate } = useMutation(() =>
    requestFn()
  );

  return { isLoading, isError, isSuccess, mutate };
};

interface IFetchDataProps {
  requestFn: Function;
  key: string | string[];
  selectFn?: Function;
}

export const fetchData = (props: IFetchDataProps) => {
  return useQuery(props.key, () => props.requestFn(), {
    onError: (err: any) => {
      // show notification
      openNotification({
        state: "error",
        title: "Error Occured",
        description:
          err?.response.data.message ?? err?.response.data.error.message,
      });
    },

    onSuccess: (data) => {
      openNotification({
        state: "success",

        title: "Success",
        description: data.message ?? "Data fetched successfully!",
        duration: 0.4,
      });
    },
    select: (res): { message: string; data: any; totalCount?: number } => {
      return props.selectFn
        ? props.selectFn(res)
        : {
            message: res.data.message,
            data: res.data,
            totalCount: res.totalCount,
          };
    },
  });
};
