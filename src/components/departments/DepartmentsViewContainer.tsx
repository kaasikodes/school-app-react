import { TablePaginationConfig } from "antd";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { useFetchDepartments } from "../../helpersAPIHooks/departments";
import DepartmentsTableView from "./DepartmentsTableView";

interface IProps {
  searchTerm?: string;
}
// TO DO
// Departments createdAt & Updated At & Author Column
const DepartmentsViewContainer = ({ searchTerm }: IProps) => {
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
    data: departmentData,
    isError,
    isFetching,
    isSuccess,
  } = useFetchDepartments({
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
      <DepartmentsTableView
        departments={isSuccess ? departmentData.data : []}
        loading={isFetching}
        pagination={{ ...pagination, total: departmentData?.total }}
        onChange={onChange}
      />
    </div>
  );
};

export default DepartmentsViewContainer;
