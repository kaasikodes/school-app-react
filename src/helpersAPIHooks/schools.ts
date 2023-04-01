import axios from "axios";
import { useQuery } from "react-query";
import { IPaginationProps, ISearchParams } from "../appTypes/requestParams";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export type TSchool = {
  name: string;
  description?: string;

  id: number;
};

const getAllSchools = async (
  props: IGetDataProps
): Promise<{ data: TSchool[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const page = pagination?.page ?? 0;

  const url = `${process.env.REACT_APP_APP_URL}/api/schools`;

  const config = {
    headers: {
      Accept: "application/json",
    },
    params: {
      page,
      limit,
    },
  };
  const res = await axios.get(url, config);
  const result = res.data.data.data;
  const total = res.data.data.total;

  const data: TSchool[] = result.map(
    (item: any): TSchool => ({
      id: item.id,
      name: item.name,
      description: item.description,
    })
  );

  const ans = {
    data,
    total,
  };

  return ans;
};

export const useFetchAllSchools = (props: IGetDataProps) => {
  const { pagination, searchParams } = props;
  const queryData = useQuery(
    ["schools", pagination?.page, pagination?.limit, searchParams?.name],
    () =>
      getAllSchools({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
