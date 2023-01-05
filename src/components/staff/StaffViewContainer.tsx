import { TablePaginationConfig } from "antd";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { useFetchAllStaff } from "../../helpersAPIHooks/staff";
import StaffTableView from "./StaffTableView";

interface IProps {
  searchTerm?: string;
}

const StaffViewContainer = ({ searchTerm }: IProps) => {
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
    data: staffData,
    isFetching,
    isSuccess,
  } = useFetchAllStaff({
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
    // TO DO
    // Edit/View department here cos you ..... (cosider globalstate managers, instead of passing)
    <div>
      <StaffTableView
        staff={isSuccess ? staffData.data : []}
        loading={isFetching}
        pagination={{ ...pagination, total: staffData?.total }}
        onChange={onChange}
      />
    </div>
  );
};

export default StaffViewContainer;
