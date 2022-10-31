import { Avatar, Table, TablePaginationConfig } from "antd";
import { ColumnsType } from "antd/lib/table";

import React, { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { IAuthDets } from "../../appTypes/auth";

import { openNotification } from "../../helpers/notifications";
import { getAllStudents } from "../../helpers/students";

export interface ICustodianEntry {
  id: string;
  photo?: string;
  name: string;
  custodianNo: string;
  studentCount: string;
}

const CustodianTable = () => {
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
          (item: any): ICustodianEntry => ({
            id: item.id,
            name: item.staff_no,
            custodianNo: item.staff_no,
            photo: item?.photo ?? "",
            studentCount: item.studentCount,
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
  const columns: ColumnsType<ICustodianEntry> = [
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
      dataIndex: "custodianNo",
      key: "custodianNo",
    },
    {
      title: "Current Class",
      dataIndex: "studentCount",
      key: "studentCount",
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

export default CustodianTable;
