import { TablePaginationConfig } from "antd";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../../appTypes/auth";
import { GlobalContext } from "../../../contexts/GlobalContextProvider";
import { useFetchSingleStaffCourseTeacherRecords } from "../../../helpersAPIHooks/staff";

import CourseTeacherRecordsTable from "./CourseTeacherRecordsTable";

interface IProps {
  searchTerm?: string;
  staffId: string;
  classId: string;
}

const CourseTeacherRecordsContainer = ({
  searchTerm,
  staffId,
  classId,
}: IProps) => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const sessionId = globalState?.currentSchool?.currentSessionId as string;

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
    data: recordData,
    isFetching,
    isSuccess,
  } = useFetchSingleStaffCourseTeacherRecords({
    schoolId,
    token,
    sessionId,
    staffId,
    levelId: classId,
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
      <CourseTeacherRecordsTable
        records={isSuccess ? recordData.data : []}
        loading={isFetching}
        pagination={{ ...pagination, total: recordData?.total }}
        onChange={onChange}
        classId={classId}
      />
    </div>
  );
};

export default CourseTeacherRecordsContainer;
