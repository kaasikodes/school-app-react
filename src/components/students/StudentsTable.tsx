import { Avatar, Table, TablePaginationConfig } from "antd";
import { ColumnsType } from "antd/lib/table";

import React, { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { IAuthDets } from "../../appTypes/auth";

import { openNotification } from "../../helpers/notifications";
import { getAllStudents } from "../../helpers/students";

export interface IStudentEntry {
  id: string;
  photo?: string;
  name: string;
  studentNo: string;
  currentClass: string;
  nextClass?: string;
}

const StudentsTable = () => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 4,
    showSizeChanger: false,
  });
  const { data, isLoading, isSuccess, error, refetch } = useQuery<
    any,
    any,
    any,
    any
  >(
    ["staff", pagination.current],
    () => {
      return getAllStudents({
        token,
        schoolId: schoolId as string,
        page: pagination.current,
        limit: pagination.pageSize,

        searchTerm,
      });
    },
    {
      refetchOnWindowFocus: false,
      onError: (err) => {
        openNotification({
          state: "error",
          title: "Error occures",
          description: `Oops, an err occured: ${err?.message}`,
        });
      },
      onSuccess: (res: any) => {
        const result = res.data.data;
        setPagination((pagination) => ({
          ...pagination,
          total: res.data.total,
        }));
        console.log("staff", result);
        const fStaff = result.map(
          (item: any): IStudentEntry => ({
            id: item.id,
            name: item.staff_no,
            studentNo: item.staff_no,
            photo: item?.photo ?? "",
            currentClass: item.currentClass,
          })
        );
        return {
          data: fStaff,
          limit: 4,
          offset: data.offset,
        };
      },
    }
  );
  const onChange = (newPagination: TablePaginationConfig) => {
    setPagination(() => ({
      ...newPagination,
    }));
  };
  const columns: ColumnsType<IStudentEntry> = [
    {
      title: "",
      dataIndex: "photo",
      key: "photo",
      render: (text: any) => <Avatar src={`${text}`} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: string, record: any) => (
        <Link to={`students/${record.id}`}>{record.name}</Link>
      ),
    },
    {
      title: "ID",
      dataIndex: "studentNo",
      key: "studentNo",
    },
    {
      title: "Current Class",
      dataIndex: "currentClass",
      key: "currentClass",
    },
  ];
  return (
    <div>
      <Table
        rowKey={(record) => record.id}
        dataSource={isSuccess ? data?.data : []}
        columns={columns}
        onChange={onChange}
        pagination={pagination}
        loading={isLoading}
        size="small"
      />
    </div>
  );
};

export default StudentsTable;
