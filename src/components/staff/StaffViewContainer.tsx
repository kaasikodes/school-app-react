import { TablePaginationConfig } from "antd";
import React, { useState } from "react";

import { useFetchAllStaff } from "../../helpersAPIHooks/staff";
import useApiAuth from "../../hooks/useApiAuth";
import StaffTableView from "./StaffTableView";

interface IProps {
  searchTerm?: string;
}

const StaffViewContainer = ({ searchTerm }: IProps) => {
  const { sessionId, token, schoolId } = useApiAuth();

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
    schoolId: `${schoolId}`,
    token,
    sessionId,
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
