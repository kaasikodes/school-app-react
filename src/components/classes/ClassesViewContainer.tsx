import { TablePaginationConfig } from "antd";
import { useState } from "react";

import { useFetchClasses } from "../../helpersAPIHooks/classes";
import useApiAuth from "../../hooks/useApiAuth";
import ClassesTableView from "./ClassesTableView";

interface IProps {
  searchTerm?: string;
}

const ClassesViewContainer = ({ searchTerm }: IProps) => {
  const { token, schoolId, sessionId } = useApiAuth();

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
    data: classesData,
    isFetching,
    isSuccess,
  } = useFetchClasses({
    sessionId,
    schoolId: `${schoolId}`,
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
      <ClassesTableView
        classes={isSuccess ? classesData.data : []}
        loading={isFetching}
        pagination={{ ...pagination, total: classesData?.total }}
        onChange={onChange}
      />
    </div>
  );
};

export default ClassesViewContainer;
