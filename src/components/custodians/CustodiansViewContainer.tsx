import { TablePaginationConfig } from "antd";
import { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { useFetchAllCustodians } from "../../helpersAPIHooks/custodians";
import CustodiansTableView from "./CustodiansTableView";

interface IProps {
  searchTerm?: string;
}

const CustodiansViewContainer = ({ searchTerm }: IProps) => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
    showSizeChanger: false,
  });
  const onChange = (newPagination: TablePaginationConfig | number) => {
    if (typeof newPagination === "number") {
      setPagination((val) => ({
        ...val,
        current: newPagination,
      }));
    } else {
      setPagination((val) => ({
        ...val,
        current: newPagination.current,
      }));
    }
  };
  const {
    data: custData,
    isFetching,
    isSuccess,
  } = useFetchAllCustodians({
    schoolId,
    token,
    pagination: {
      limit: pagination.pageSize,

      page: pagination.current,
    },
    searchParams: {
      name: searchTerm,
    },
  });
  return (
    <div>
      <div>
        <CustodiansTableView
          custodians={isSuccess ? custData.data : []}
          loading={isFetching}
          pagination={{ ...pagination, total: custData?.total }}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CustodiansViewContainer;
